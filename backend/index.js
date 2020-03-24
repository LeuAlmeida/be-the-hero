const express = require('express');

const app = express();

app.get('/', (req, res) => res.json({
  evento: 'Semana Omnistack 11',
  aluno: 'Léu Almeida',
}));

app.listen(3333);
