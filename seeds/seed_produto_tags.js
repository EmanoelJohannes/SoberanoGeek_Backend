exports.seed = async function (knex) {
    await knex('produto_tags').del();

    // Buscar os produtos pelo nome
    const produtos = await knex('produtos').select('id', 'nome');
    const tags = await knex('tags').select('id', 'descricao');

    const getProdutoId = (nome) => produtos.find((produto) => produto.nome === nome)?.id;
    const getTagId = (descricao) => tags.find((tag) => tag.descricao === descricao)?.id;

    // Mapear os produtos e tags
    const produtoTags = [
        { produto: 'Caneca Naruto', tags: ['caneca', 'caneca_anime'] },
        { produto: 'Caneca Pac-Man', tags: ['caneca', 'caneca_jogos'] },
        { produto: 'Caneca Personalizada One Piece', tags: ['caneca', 'caneca_anime'] },
        { produto: 'Camiseta Goku', tags: ['camiseta', 'anime_shounen'] },
        { produto: 'Camiseta Shounen Jump', tags: ['camiseta', 'anime_shounen'] },
        { produto: 'Action Figure Sonic', tags: ['jogos', 'jogos_console'] },
        { produto: 'Action Figure Mario', tags: ['jogos', 'jogos_console'] },
        { produto: 'Fone Bluetooth Sony', tags: ['fone_de_ouvido', 'fone_bluetooth'] },
        { produto: 'Fone com Fio HyperX', tags: ['fone_de_ouvido', 'fone_com_fio'] },
        { produto: 'Notebook Dell Inspiron', tags: ['notebook', 'notebook_ultrafino'] },
        { produto: 'Notebook Gamer Lenovo', tags: ['notebook', 'notebook_gamer'] }
    ];

    // Inserir associações na tabela produto_tags
    for (const { produto, tags: tagList } of produtoTags) {
        const produtoId = getProdutoId(produto);
        if (!produtoId) {
            console.error(`Produto não encontrado: ${produto}`);
            continue;
        }

        for (const tagDescricao of tagList) {
            const tagId = getTagId(tagDescricao);
            if (!tagId) {
                console.error(`Tag não encontrada: ${tagDescricao}`);
                continue;
            }

            await knex('produto_tags').insert({
                produto_id: produtoId,
                tag_id: tagId
            });
        }
    }
};
