'use strict';
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

// Ocultar X-Powered-By
app.disable('x-powered-by');

// Desactivar CSP de helmet (FCC no lo lee bien en Render)
app.use(
  helmet({
    contentSecurityPolicy: false
  })
);

// Forzar CSP EXACTA para FCC (esta es la clave)
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self'; style-src 'self'"
  );
  next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos
app.use('/public', express.static(process.cwd() + '/public'));

app.route('/').get((req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// API
require('./routes/api.js')(app);

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

module.exports = app;
