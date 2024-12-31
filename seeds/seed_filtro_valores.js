exports.seed = async function (knex) {
  await knex('valores_filtros').del();

  // Buscar filtros diretamente pelo nome
  const filtros = await knex('filtros').select('id', 'nome');
  console.log('Filtros Disponíveis:', filtros);

  const filtroMarcaNotebook = filtros.find(filtro => filtro.nome === 'Marca'); // Notebook
  const filtroRam = filtros.find(filtro => filtro.nome === 'RAM');
  const filtroProc = filtros.find(filtro => filtro.nome === 'Processador');
  const filtroConexao = filtros.find(filtro => filtro.nome === 'Conexão');
  const filtroMaterialCaneca = filtros.find(filtro => filtro.nome === 'Material');
  const filtroEstiloCaneca = filtros.find(filtro => filtro.nome === 'Estilo');
  const filtroTamanhoCamiseta = filtros.find(filtro => filtro.nome === 'Tamanho');
  const filtroCorCamiseta = filtros.find(filtro => filtro.nome === 'Cor');
  const filtroEstampaCamiseta = filtros.find(filtro => filtro.nome === 'Estampa');

  // Validar se todos os filtros necessários foram encontrados
  if (
      !filtroMarcaNotebook || !filtroRam || !filtroProc || 
      !filtroConexao || !filtroMaterialCaneca || !filtroEstiloCaneca || 
      !filtroTamanhoCamiseta || !filtroCorCamiseta || !filtroEstampaCamiseta
  ) {
      throw new Error('Certifique-se de que todos os filtros necessários foram inseridos na tabela filtros.');
  }

  // Inserir os valores
  await knex('valores_filtros').insert([
      // Valores de Marca (Notebook)
      { valor: 'Dell', filtro_id: filtroMarcaNotebook.id },
      { valor: 'HP', filtro_id: filtroMarcaNotebook.id },
      { valor: 'Lenovo', filtro_id: filtroMarcaNotebook.id },

      // Valores de RAM
      { valor: '8GB', filtro_id: filtroRam.id },
      { valor: '16GB', filtro_id: filtroRam.id },
      { valor: '32GB', filtro_id: filtroRam.id },

      // Valores de Processador
      { valor: 'Intel i5', filtro_id: filtroProc.id },
      { valor: 'Intel i7', filtro_id: filtroProc.id },
      { valor: 'AMD Ryzen 5', filtro_id: filtroProc.id },

      // Valores de Conexão (Fone)
      { valor: 'Bluetooth', filtro_id: filtroConexao.id },
      { valor: 'Com Fio', filtro_id: filtroConexao.id },

      // Valores de Material (Caneca)
      { valor: 'Cerâmica', filtro_id: filtroMaterialCaneca.id },
      { valor: 'Plástico', filtro_id: filtroMaterialCaneca.id },

      // Valores de Estilo (Caneca)
      { valor: 'Anime', filtro_id: filtroEstiloCaneca.id },
      { valor: 'Jogos', filtro_id: filtroEstiloCaneca.id },

      // Valores de Tamanho (Camiseta)
      { valor: 'P', filtro_id: filtroTamanhoCamiseta.id },
      { valor: 'M', filtro_id: filtroTamanhoCamiseta.id },
      { valor: 'G', filtro_id: filtroTamanhoCamiseta.id },

      // Valores de Cor (Camiseta)
      { valor: 'Preto', filtro_id: filtroCorCamiseta.id },
      { valor: 'Branco', filtro_id: filtroCorCamiseta.id },
      { valor: 'Vermelho', filtro_id: filtroCorCamiseta.id },

      // Valores de Estampa (Camiseta)
      { valor: 'Liso', filtro_id: filtroEstampaCamiseta.id },
      { valor: 'Com Estampa', filtro_id: filtroEstampaCamiseta.id }
  ]);
};
