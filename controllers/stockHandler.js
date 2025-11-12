'use strict';
const fetch = require('node-fetch');

const likesDB = {}; // persistencia en memoria

function normalizeStock(symbol) {
  return symbol.toUpperCase();
}

class StockHandler {
  async getStock(symbol, like, ip) {
    const stock = normalizeStock(symbol);
    const response = await fetch(`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${stock}/quote`);
    const data = await response.json();

    if (!data || !data.latestPrice) {
      throw new Error(`No se encontró el precio para ${stock}`);
    }

    // Inicializar si no existe
    if (!likesDB[stock]) {
      likesDB[stock] = new Set();
    }

    // Like por IP
    if (like === true || like === 'true') {
      likesDB[stock].add(ip);
    }

    return {
      stock,
      price: data.latestPrice,
      likes: likesDB[stock].size
    };
  }
}

module.exports = StockHandler;

