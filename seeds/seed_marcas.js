exports.seed = async function (knex) {
  await knex('marcas').del();

  await knex('marcas').insert([
    { nome: 'Anime Collection', departamento: 'Canecas', descricao: 'Coleção de produtos inspirados em animes' },
    { nome: 'Gaming Classics', departamento: 'Canecas', descricao: 'Produtos temáticos de jogos clássicos' },
    { nome: 'Anime Custom', departamento: 'Canecas', descricao: 'Produtos personalizados de animes' },
    { nome: 'Anime Wear', departamento: 'Roupas', descricao: 'Roupas temáticas de animes' },
    { nome: 'Game Collectibles', departamento: 'Colecionáveis', descricao: 'Colecionáveis de jogos famosos' },
    { nome: 'Sony', departamento: 'Eletrônicos', descricao: 'Produtos eletrônicos de alta qualidade' },
    { nome: 'HyperX', departamento: 'Eletrônicos', descricao: 'Equipamentos para gamers' },
    { nome: 'Dell', departamento: 'Computadores', descricao: 'Notebooks e PCs confiáveis' },
    { nome: 'Lenovo', departamento: 'Computadores', descricao: 'Notebooks e equipamentos de alta performance' },
  ]);
};
