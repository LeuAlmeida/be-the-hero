const express = require('express');

const app = express();

app.use(express.json());

app.post('/users', (req, res) =>
  res.json({
    evento: 'Semana Omnistack 11',
    aluno: 'Léu Almeida',
  })
);

app.listen(3333);
