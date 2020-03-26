const connection = require('../database/connection');

module.exports = {
  async index(req, res) {
    const incidents = await connection('incidents').select('*');

    return res.json(incidents);
  },

  async store(req, res) {
    const { title, description, value } = req.body;
    const ong_id = req.headers.authorization;

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id,
    });

    return res.json({ id });
  },

  async delete(req, res) {
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    if (!ong_id) {
      return res
        .status(401)
        .json({ error: 'You must need an ONG identification.' });
    }

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();

    if (!incident || incident.length === 0 || incident === null) {
      return res.status(401).json({ error: 'Incident does not found.' });
    }

    if (incident.ong_id !== ong_id) {
      return res.status(401).json({ error: 'Operation not permitted.' });
    }

    try {
      await connection('incidents').where('id', id).delete();
    } catch (err) {
      return res.status(400).json({ error: 'Incident was not deleted.' });
    }

    return res.status(204).send();
  },
};
