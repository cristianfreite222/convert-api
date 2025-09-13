const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


function parseNumber(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}


app.get('/', (req, res) => {
  res.json({
    message: 'API de conversión: usa /convert/celsius-to-fahrenheit/:value, /convert/fahrenheit-to-celsius/:value, /convert/km-to-miles/:value'
  });
});


app.get('/convert/celsius-to-fahrenheit/:value', (req, res) => {
  const c = parseNumber(req.params.value);
  if (c === null) return res.status(400).json({ error: 'Valor inválido. Usa un número.' });

  const f = (c * 9 / 5) + 32;
  res.json({
    input: `${c} °C`,
    output: Number(f.toFixed(6)),
    formula: 'F = C * 9/5 + 32'
  });
});


app.get('/convert/fahrenheit-to-celsius/:value', (req, res) => {
  const f = parseNumber(req.params.value);
  if (f === null) return res.status(400).json({ error: 'Valor inválido. Usa un número.' });

  const c = (f - 32) * 5 / 9;
  res.json({
    input: `${f} °F`,
    output: Number(c.toFixed(6)),
    formula: 'C = (F - 32) * 5/9'
  });
});


app.get('/convert/km-to-miles/:value', (req, res) => {
  const km = parseNumber(req.params.value);
  if (km === null) return res.status(400).json({ error: 'Valor inválido. Usa un número.' });

  const miles = km * 0.621371;
  res.json({
    input: `${km} km`,
    output: Number(miles.toFixed(6)),
    formula: 'miles = km * 0.621371'
  });
});


app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});


app.listen(port, () => {
  console.log(`Convert API escuchando en http://localhost:${port}`);
});