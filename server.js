// server.js
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

// Puerto para Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});

module.exports = app;
