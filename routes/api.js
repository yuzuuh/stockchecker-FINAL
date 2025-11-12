'use strict';
const StockHandler = require('../controllers/stockHandler.js');
const fetch = require('node-fetch');

module.exports = function (app) {
  const stockHandler = new StockHandler();

  app.route('/api/stock-prices')
    .get(async function (req, res) {
      const { stock, like } = req.query;

      try {
        if (Array.isArray(stock)) {
          // Si hay dos stocks
          const [data1, data2] = await Promise.all([
            stockHandler.getStock(stock[0], like, req.ip),
            stockHandler.getStock(stock[1], like, req.ip)
          ]);

          const rel_likes_1 = data1.likes - data2.likes;
          const rel_likes_2 = data2.likes - data1.likes;

          return res.json({
            stockData: [
              { stock: data1.stock, price: data1.price, rel_likes: rel_likes_1 },
              { stock: data2.stock, price: data2.price, rel_likes: rel_likes_2 }
            ]
          });
        } else {
          // Solo un stock
          const data = await stockHandler.getStock(stock, like, req.ip);
          return res.json({ stockData: data });
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener datos del stock.' });
      }
    });
};
