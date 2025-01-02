exports.seed = async function (knex) {
    await knex('produtos').del();
  
    const marcas = await knex('marcas').select('id', 'nome');
  
    const findMarcaId = (nome) => marcas.find((marca) => marca.nome === nome)?.id;
  
    await knex('produtos').insert([
      { nome: 'Caneca Naruto', descricao: 'Caneca temática do anime Naruto', preco: 29.90, categoria: 'Canecas', quantidade: 50, modelo: 'Naruto Shippuden', fabricante: 'GeekWare', data_fabricacao: '2024-01-15', marca_id: findMarcaId('Anime Collection') },
      { nome: 'Caneca Pac-Man', descricao: 'Caneca temática do jogo Pac-Man', preco: 29.90, categoria: 'Canecas', quantidade: 100, modelo: 'Pac-Man Edition', fabricante: 'GameCraft', data_fabricacao: '2023-11-10', marca_id: findMarcaId('Gaming Classics') },
      { nome: 'Caneca Personalizada One Piece', descricao: 'Caneca personalizada do anime One Piece', preco: 34.90, categoria: 'Canecas', quantidade: 70, modelo: 'One Piece Edition', fabricante: 'CustomGeek', data_fabricacao: '2024-02-01', marca_id: findMarcaId('Anime Custom') },
      { nome: 'Camiseta Goku', descricao: 'Camiseta temática do anime Dragon Ball', preco: 49.90, categoria: 'Roupas', quantidade: 30, modelo: 'Goku Edition', fabricante: 'WearGeek', data_fabricacao: '2023-09-05', marca_id: findMarcaId('Anime Wear') },
      { nome: 'Camiseta Shounen Jump', descricao: 'Camiseta temática das séries da Shounen Jump', preco: 54.90, categoria: 'Roupas', quantidade: 40, modelo: 'Shounen Jump Edition', fabricante: 'WearGeek', data_fabricacao: '2023-12-10', marca_id: findMarcaId('Anime Wear') },
      { nome: 'Action Figure Sonic', descricao: 'Figura de ação do personagem Sonic', preco: 120.00, categoria: 'Colecionáveis', quantidade: 20, modelo: 'Sonic Edition', fabricante: 'CollectorZone', data_fabricacao: '2023-08-20', marca_id: findMarcaId('Game Collectibles') },
      { nome: 'Action Figure Mario', descricao: 'Figura de ação do personagem Mario', preco: 115.00, categoria: 'Colecionáveis', quantidade: 25, modelo: 'Mario Edition', fabricante: 'CollectorZone', data_fabricacao: '2023-10-10', marca_id: findMarcaId('Game Collectibles') },
      { nome: 'Fone Bluetooth Sony', descricao: 'Fone de ouvido Bluetooth da marca Sony', preco: 350.00, categoria: 'Eletrônicos', quantidade: 15, modelo: 'WH-CH510', fabricante: 'Sony Corporation', data_fabricacao: '2023-07-15', marca_id: findMarcaId('Sony') },
      { nome: 'Fone com Fio HyperX', descricao: 'Fone de ouvido com fio da marca HyperX', preco: 200.00, categoria: 'Eletrônicos', quantidade: 30, modelo: 'Cloud Stinger', fabricante: 'Kingston', data_fabricacao: '2023-05-20', marca_id: findMarcaId('HyperX') },
      { nome: 'Notebook Dell Inspiron', descricao: 'Notebook Dell para uso geral', preco: 4500.00, categoria: 'Computadores', quantidade: 10, modelo: 'Inspiron 15', fabricante: 'Dell Technologies', data_fabricacao: '2023-04-15', marca_id: findMarcaId('Dell') },
      { nome: 'Notebook Gamer Lenovo', descricao: 'Notebook gamer da Lenovo com alto desempenho', preco: 6500.00, categoria: 'Computadores', quantidade: 5, modelo: 'Legion 5', fabricante: 'Lenovo Group', data_fabricacao: '2023-06-01', marca_id: findMarcaId('Lenovo') },
    ]);
  };
  