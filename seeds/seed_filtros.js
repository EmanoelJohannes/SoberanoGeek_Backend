exports.seed = async function (knex) {
  await knex('filtros').del();

  // Verificar se as tags existem
  const tags = await knex('tags').select('id', 'descricao');

  const tagNotebook = tags.find(tag => tag.descricao === 'notebook');
  const tagFone = tags.find(tag => tag.descricao === 'fone_de_ouvido');
  const tagCaneca = tags.find(tag => tag.descricao === 'caneca');
  const tagCamiseta = tags.find(tag => tag.descricao === 'camiseta');

  if (!tagNotebook || !tagFone || !tagCaneca || !tagCamiseta) {
      throw new Error('Certifique-se de que todas as tags necessárias foram inseridas.');
  }

  // Inserir os filtros
  await knex('filtros').insert([
      // Filtros para Notebook
      { nome: 'Marca', tag_id: tagNotebook.id },
      { nome: 'RAM', tag_id: tagNotebook.id },
      { nome: 'Processador', tag_id: tagNotebook.id },

      // Filtros para Fone de Ouvido
      { nome: 'Marca', tag_id: tagFone.id },
      { nome: 'Conexão', tag_id: tagFone.id },
      { nome: 'Capacidade', tag_id: tagFone.id },

      // Filtros para Caneca
      { nome: 'Estilo', tag_id: tagCaneca.id },
      { nome: 'Material', tag_id: tagCaneca.id },

      // Filtros para Camiseta
      { nome: 'Tamanho', tag_id: tagCamiseta.id },
      { nome: 'Cor', tag_id: tagCamiseta.id },
      { nome: 'Estampa', tag_id: tagCamiseta.id }
  ]);
};
