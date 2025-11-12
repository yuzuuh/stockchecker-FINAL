require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// seguridad básica
app.use(helmet());
app.use(cors());

// servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// ejemplo de ruta API
app.get('/api/stock', (req, res) => {
  res.json({ stock: 'AAPL', price: 189.75 });
});

app.listen(PORT, () => console.log(`✅ Servidor corriendo en puerto ${PORT}`));
