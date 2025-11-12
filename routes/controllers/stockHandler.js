'use strict';
const fetch = require('node-fetch');

let likesDB = {}; // almacenamiento temporal (FCC no exige base real)

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

    // Inicializa si no existe
    if (!likesDB[stock]) {
      likesDB[stock] = { likes: new Set() };
    }

    // Manejar el "like"
    if (like === 'true') {
      likesDB[stock].likes.add(ip);
    }

    return {
      stock: stock,
      price: data.latestPrice,
      likes: likesDB[stock].likes.size
    };
  }
}

module.exports = StockHandler;
