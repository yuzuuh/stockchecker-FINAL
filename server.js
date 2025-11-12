const express = require('express');
const helmet = require('helmet');
const csp = helmet.contentSecurityPolicy;

const app = express();

// Seguridad con Helmet v5
app.use(helmet());
app.use(
  csp({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'"],
      imgSrc: ["'self'"],
    },
  })
);

app.use(express.static('public'));

// Importar rutas de API
const apiRoutes = require('./routes/api');
app.use('/api/stock-prices', apiRoutes);

module.exports = app;
