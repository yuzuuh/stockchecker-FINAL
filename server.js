'use strict';
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

// ✅ EXACTO formato que FCC valida
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "default-src": ["'self'"],
      "script-src": ["'self'"],
      "style-src": ["'self'"]
    },
    useDefaults: false // ⚠️ evita agregar otras directivas automáticas
  })
);

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ archivos estáticos e index
app.use('/public', express.static(process.cwd() + '/public'));
app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// ✅ rutas API
require('./routes/api.js')(app);

// ✅ iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;
