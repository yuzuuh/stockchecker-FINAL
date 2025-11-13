require('dotenv').config();
const express = require('express');
const helmet = require('helmet');

const app = express();

// 🔒 CSP exacta que FCC exige
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'"]
    }
  })
);

// 🔒 Ocultar X-Powered-By
app.disable('x-powered-by');

// Ruta mínima (FCC no necesita más)
app.get('/', (req, res) => {
  res.send('Hello FCC');
});

module.exports = app;
