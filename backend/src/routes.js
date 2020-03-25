const express = require('express');

const routes = express.Router();

routes.post('/users', (req, res) => {
  res.json({
    evento: 'Semana Omnistack 11',
    aluno: 'Léu Almeida',
  });
});

module.exports = routes;
