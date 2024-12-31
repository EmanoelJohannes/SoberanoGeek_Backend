const express = require('express');
const cors = require('cors');
const produtosRoutes = require('./src/routes/produtosRoutes');
const usuariosRoutes = require('./src/routes/usuariosRoutes');
const filtersRoutes = require('./src/routes/filtersRoutes');
const produtoImagensRoutes = require('./src/routes/produtoImagensRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/uploads', express.static('public/uploads'));
app.use('/api/produtos', produtosRoutes);
app.use('/api/produto-imagens', produtoImagensRoutes);
app.use('/api/filters', filtersRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
