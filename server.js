'use strict';

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

// ✅ Configuración de seguridad: solo permitir scripts y estilos del mismo servidor
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"]
      },
    },
    crossOriginEmbedderPolicy: false, // evita errores con FCC
  })
);

// ✅ Middleware básico
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Servir archivos estáticos
app.use('/public', express.static(process.cwd() + '/public'));

// ✅ Página principal
app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// ✅ Rutas de la API
require('./routes/api.js')(app);

// ✅ Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

module.exports = app;
