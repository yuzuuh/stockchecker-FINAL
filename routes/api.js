'use strict';
const StockHandler = require('../controllers/stockHandler.js');

module.exports = function (app) {
  const stockHandler = new StockHandler();

  app.route('/api/stock-prices')
    .get(async function (req, res) {
      try {
        let { stock, like } = req.query;
        if (!stock) return res.status(400).json({ error: 'Missing stock symbol' });

        // Asegura que 'stock' sea siempre un array
        const stocks = Array.isArray(stock) ? stock : [stock];

        if (stocks.length === 1) {
          const data = await stockHandler.getStock(stocks[0], like, req.ip);
          return res.json({ stockData: data });
        } else {
          const [data1, data2] = await Promise.all([
            stockHandler.getStock(stocks[0], like, req.ip),
            stockHandler.getStock(stocks[1], like, req.ip)
          ]);

          const rel_likes_1 = data1.likes - data2.likes;
          const rel_likes_2 = data2.likes - data1.likes;

          return res.json({
            stockData: [
              { stock: data1.stock, price: data1.price, rel_likes: rel_likes_1 },
              { stock: data2.stock, price: data2.price, rel_likes: rel_likes_2 }
            ]
          });
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener datos del stock.' });
      }
    });
};
