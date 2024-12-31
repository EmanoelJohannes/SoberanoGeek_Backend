exports.seed = async function (knex) {
  await knex('tags').del();

  // Inserir as tags "parent"
  const parentTags = await knex('tags')
      .insert([
          { descricao: 'caneca', parent_id: null, tipo: 'categoria' },
          { descricao: 'anime', parent_id: null, tipo: 'categoria' },
          { descricao: 'jogos', parent_id: null, tipo: 'categoria' },
          { descricao: 'notebook', parent_id: null, tipo: 'categoria' },
          { descricao: 'fone_de_ouvido', parent_id: null, tipo: 'categoria' },
          { descricao: 'camiseta', parent_id: null, tipo: 'categoria' }
      ])
      .returning('id');

  const [canecaId, animeId, jogosId, notebookId, foneId, camisetaId] = parentTags.map(id => typeof id === 'object' ? id.id : id);

  // Inserir as tags "child" com os IDs numéricos dos pais
  await knex('tags').insert([
      // Tags relacionadas a Canecas
      { descricao: 'caneca_anime', parent_id: canecaId, tipo: 'subcategoria' },
      { descricao: 'caneca_jogos', parent_id: canecaId, tipo: 'subcategoria' },
      { descricao: 'caneca_personalizada', parent_id: canecaId, tipo: 'subcategoria' },

      // Tags relacionadas a Notebooks
      { descricao: 'notebook_gamer', parent_id: notebookId, tipo: 'subcategoria' },
      { descricao: 'notebook_ultrafino', parent_id: notebookId, tipo: 'subcategoria' },
      { descricao: 'notebook_2em1', parent_id: notebookId, tipo: 'subcategoria' },

      // Tags relacionadas a Fones de Ouvido
      { descricao: 'fone_bluetooth', parent_id: foneId, tipo: 'subcategoria' },
      { descricao: 'fone_com_fio', parent_id: foneId, tipo: 'subcategoria' },
      { descricao: 'fone_ruido_ativo', parent_id: foneId, tipo: 'subcategoria' },

      // Tags relacionadas a Jogos
      { descricao: 'jogos_console', parent_id: jogosId, tipo: 'subcategoria' },
      { descricao: 'jogos_pc', parent_id: jogosId, tipo: 'subcategoria' },
      { descricao: 'jogos_mobile', parent_id: jogosId, tipo: 'subcategoria' },

      // Tags relacionadas a Animes
      { descricao: 'anime_shounen', parent_id: animeId, tipo: 'subcategoria' },
      { descricao: 'anime_shoujo', parent_id: animeId, tipo: 'subcategoria' },
      { descricao: 'anime_mecha', parent_id: animeId, tipo: 'subcategoria' },

      // Tags relacionadas a Camisetas
      { descricao: 'camiseta_preta', parent_id: camisetaId, tipo: 'subcategoria' },
      { descricao: 'camiseta_branca', parent_id: camisetaId, tipo: 'subcategoria' },
      { descricao: 'camiseta_estampada', parent_id: camisetaId, tipo: 'subcategoria' }
  ]);
};
