'use strict';

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

// ✅ Configurar Content Security Policy (CSP) para que solo permita scripts y estilos desde el mismo servidor
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'"]
    },
  })
);

// ✅ Middleware de seguridad y utilidades
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Servir archivos estáticos y vista principal
app.use('/public', express.static(process.cwd() + '/public'));
app.route('/').get(function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// ✅ Rutas de la API (importa tu archivo api.js)
require('./routes/api.js')(app);

// ✅ Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

module.exports = app;
