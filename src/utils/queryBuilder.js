const buildQuery = (query, filters) => {
    const groupedFilters = filters.reduce((acc, filter) => {
        if (!acc[filter.coluna]) {
            acc[filter.coluna] = [];
        }
        acc[filter.coluna].push(filter);
        return acc;
    }, {});

    Object.entries(groupedFilters).forEach(([coluna, columnFilters]) => {
        if (coluna === 'valores_filtros.valor' || coluna === 'marcas.nome') {
            const values = columnFilters.flatMap(filter => filter.valor);
            query.andWhere(builder => {
                builder.whereIn(coluna, values);
            });
        } else {
            columnFilters.forEach(filter => {
                query.andWhere(filter.coluna, filter.operador, filter.valor);
            });
        }
    });

    return query;
};

module.exports = buildQuery;
