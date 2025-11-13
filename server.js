'use strict';
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

// 🔒 Configuración Helmet según FCC
app.use(helmet.hidePoweredBy()); // ✅ Consigna 2
app.use(helmet.frameguard({ action: 'deny' })); // Consigna 3
app.use(helmet.xssFilter()); // Consigna 4
app.use(helmet.noSniff()); // Consigna 5
app.use(helmet.ieNoOpen()); // Consigna 6
app.use(
  helmet.contentSecurityPolicy({ // ✅ Consigna 7
    directives: {
      "default-src": ["'self'"],
      "script-src": ["'self'"],
      "style-src": ["'self'"]
    }
  })
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos y vista principal
app.use('/public', express.static(process.cwd() + '/public'));
app.route('/').get(function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Rutas de la API
require('./routes/api.js')(app);

// Inicio del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

module.exports = app;
