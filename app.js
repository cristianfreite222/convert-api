const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


function parseNumber(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}


app.get('/', (req, res) => {
  res.json({
    message: 'API de conversión: usa /convert?from=celsius&to=fahrenheit&values=25,30'
  });
});


app.get('/convert', (req, res) => {
  const { from, to, values } = req.query;

  if (!from || !to || !values) {
    return res.status(400).json({ error: 'Faltan parámetros. Usa from, to y values' });
  }

  
  const numbers = values.split(',').map(parseNumber).filter(n => n !== null);
  if (numbers.length === 0) return res.status(400).json({ error: 'Valores inválidos' });

  
  const convert = (from, to, n) => {
    switch (`${from}->${to}`) {
      case 'celsius->fahrenheit': return (n * 9/5) + 32;
      case 'fahrenheit->celsius': return (n - 32) * 5/9;
      case 'km->miles': return n * 0.621371;
      default: return null;
    }
  };

  const results = numbers.map(n => {
    const output = convert(from.toLowerCase(), to.toLowerCase(), n);
    if (output === null) return { input: n, error: 'Conversión no soportada' };
    return { input: n, output: Number(output.toFixed(6)) };
  });

  res.json(results);
});


app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});


app.listen(port, () => {
  console.log(`Convert API escuchando en http://localhost:${port}`);
});
