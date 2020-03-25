const express = require('express');
const connection = require('./database/connection');

const OngController = require('./controllers/OngController');

const routes = express.Router();

routes.get('/ongs', async (req, res) => {
  const ongs = await connection('ongs').select('*');

  return res.json(ongs);
});

routes.post('/ongs', OngController.store);

module.exports = routes;
