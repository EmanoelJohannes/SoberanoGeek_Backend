const buildQuery = (query, filters) => {
    // Agrupar filtros por coluna
    const groupedFilters = filters.reduce((acc, filter) => {
        if (!acc[filter.coluna]) {
            acc[filter.coluna] = [];
        }
        acc[filter.coluna].push(filter);
        return acc;
    }, {});

    // Aplicar os filtros ao query
    Object.entries(groupedFilters).forEach(([coluna, columnFilters]) => {
        if (coluna === 'valores_filtros.valor') {
            // Agrupar múltiplos valores de 'valores_filtros.valor'
            const values = columnFilters.map(filter => filter.valor);
            query.andWhere(builder => {
                builder.whereIn(coluna, values);
            });
        } else {
            // Aplicar condições individuais
            columnFilters.forEach(filter => {
                query.andWhere(filter.coluna, filter.operador, filter.valor);
            });
        }
    });

    return query;
};

module.exports = buildQuery;
