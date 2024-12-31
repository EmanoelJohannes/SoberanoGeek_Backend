exports.seed = async function (knex) {
    await knex('produto_filtro_valores').del();
  
    // Buscar produtos
    const produtos = await knex('produtos').select('id', 'nome');
    console.log('Produtos Disponíveis:', produtos);
  
    // Buscar valores de filtros
    const valoresFiltros = await knex('valores_filtros').select('id', 'valor');
    console.log('Valores de Filtros Disponíveis:', valoresFiltros);
  
    // Associar produtos aos valores de filtros
    const associations = [
      // Canecas
      { produto: 'Caneca Naruto', filtros: ['Cerâmica', 'Anime'] },
      { produto: 'Caneca Pac-Man', filtros: ['Cerâmica', 'Jogos'] },
      { produto: 'Caneca Personalizada One Piece', filtros: ['Cerâmica', 'Anime'] },
  
      // Camisetas
      { produto: 'Camiseta Goku', filtros: ['M', 'Com Estampa'] },
      { produto: 'Camiseta Shounen Jump', filtros: ['G', 'Com Estampa'] },
  
      // Action Figures
      { produto: 'Action Figure Sonic', filtros: ['Jogos'] },
      { produto: 'Action Figure Mario', filtros: ['Jogos'] },
  
      // Fones de Ouvido
      { produto: 'Fone Bluetooth Sony', filtros: ['Bluetooth'] },
      { produto: 'Fone com Fio HyperX', filtros: ['Com Fio'] },
  
      // Notebooks
      { produto: 'Notebook Dell Inspiron', filtros: ['Dell', '8GB'] },
      { produto: 'Notebook Gamer Lenovo', filtros: ['Lenovo', '16GB'] },
    ];
  
    // Montar as inserções
    const inserts = associations.flatMap(({ produto, filtros }) => {
      const produtoEncontrado = produtos.find(p => p.nome === produto);
      if (!produtoEncontrado) {
        throw new Error(`Produto "${produto}" não encontrado.`);
      }
  
      return filtros.map(filtroValor => {
        const filtroEncontrado = valoresFiltros.find(vf => vf.valor === filtroValor);
        if (!filtroEncontrado) {
          throw new Error(`Valor de filtro "${filtroValor}" não encontrado.`);
        }
  
        return {
          produto_id: produtoEncontrado.id,
          valor_filtro_id: filtroEncontrado.id,
        };
      });
    });
  
    // Inserir na tabela produto_filtro_valores
    await knex('produto_filtro_valores').insert(inserts);
  };
  