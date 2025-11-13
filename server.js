'use strict';
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

// 🔒 Quitar el header "X-Powered-By" que FCC revisa
app.disable('x-powered-by');

// 🔐 Configurar Helmet con políticas CSP básicas
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "default-src": ["'self'"],
      "script-src": ["'self'"],
      "style-src": ["'self'"]
    }
  })
);

// 🌐 Habilitar CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 📂 Servir archivos estáticos y vista principal
app.use('/public', express.static(process.cwd() + '/public'));
app.route('/').get(function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// 🧩 Rutas de la API
require('./routes/api.js')(app);

// 🚀 Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

module.exports = app;
