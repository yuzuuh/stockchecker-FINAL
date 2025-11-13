'use strict';
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

// 🔒 Oculta el header "X-Powered-By: Express" (necesario para FCC)
app.use(helmet.hidePoweredBy());

// 🔐 Aplica Content Security Policy (solo carga scripts y estilos desde tu servidor)
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "default-src": ["'self'"],
      "script-src": ["'self'"],
      "style-src": ["'self'"]
    }
  })
);

// 🌍 Habilita CORS para permitir peticiones externas (FCC las necesita)
app.use(cors());

// ⚙️ Middleware para manejar JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🗂️ Servir archivos estáticos y la vista principal
app.use('/public', express.static(process.cwd() + '/public'));
app.route('/').get(function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// 📡 Rutas de la API
require('./routes/api.js')(app);

// 🚀 Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

module.exports = app;
