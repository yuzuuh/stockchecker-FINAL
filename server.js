'use strict';
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

// 🔒 Ocultar X-Powered-By
app.disable('x-powered-by');

// 🔐 Helmet con solo las directivas mínimas que FCC pide
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        "default-src": ["'self'"],
        "script-src": ["'self'"],
        "style-src": ["'self'"]
      },
    },
  })
);

// 🌐 CORS y middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 📂 Archivos estáticos
app.use('/public', express.static(process.cwd() + '/public'));
app.route('/').get((req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// 🧩 Rutas API
require('./routes/api.js')(app);

// 🚀 Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

module.exports = app;
