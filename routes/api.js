const express = require('express');
const fetch = require('node-fetch'); // o axios si lo prefieres
const router = express.Router();

const stockDataStore = {}; // Guardará likes por stock

// Función simple para anonimizar IP
function anonymizeIP(ip) {
  // IPv4 ejemplo: 123.45.67.89 -> 123.45.0.0
  return ip.split('.').slice(0, 2).concat(['0', '0']).join('.');
}

// Ruta principal
router.get('/', async (req, res) => {
  let { stock, like } = req.query;
  if (!stock) return res.json({ error: 'Stock no proporcionado' });

  if (!Array.isArray(stock)) stock = [stock]; // Manejo de 1 o 2 stocks

  const results = [];

  for (let s of stock) {
    s = s.toUpperCase();
    const response = await fetch(
      `https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${s}/quote`
    );
    const data = await response.json();

    // Inicializar stock en memoria
    if (!stockDataStore[s]) stockDataStore[s] = { likes: 0, ips: new Set() };

    // Manejo de likes por IP
    const userIP = anonymizeIP(req.ip);
    if (like === 'true' && !stockDataStore[s].ips.has(userIP)) {
      stockDataStore[s].likes += 1;
      stockDataStore[s].ips.add(userIP);
    }

    results.push({
      stock: s,
      price: data.latestPrice,
      likes: stockDataStore[s].likes,
    });
  }

  // Para 2 stocks, calcular rel_likes
  if (results.length === 2) {
    const rel_likes_0 = results[0].likes - results[1].likes;
    const rel_likes_1 = results[1].likes - results[0].likes;
    res.json({
      stockData: [
        { stock: results[0].stock, price: results[0].price, rel_likes: rel_likes_0 },
        { stock: results[1].stock, price: results[1].price, rel_likes: rel_likes_1 },
      ],
    });
  } else {
    res.json({ stockData: results[0] });
  }
});

module.exports = router;
