Criar seeds:

npx knex seed:make seed_tags --knexfile knexfile.js

Criar migrations:

npx knex migrate:make create_produto_tag_table

Rodar seeds:

npx knex seed:run

Rodar migrations:

npx knex migrate:latest


Rode as migrations na seguinte ordem:
npx knex seed:run --specific=seed_marcas.js
npx knex seed:run --specific=seed_produtos.js
npx knex seed:run --specific=seed_tags.js
npx knex seed:run --specific=seed_filtros.js
npx knex seed:run --specific=seed_valores_filtros.js
npx knex seed:run --specific=seed_produto_filtro_valores.js
npx knex seed:run --specific=seed_produto_tags.js
npx knex seed:run --specific=seed_usuarios.js

Exemplo de url para pegar produtos baseados na tag:

http://localhost:5000/api/produtos/tag/notebook?minPrice=2000&maxPrice=8000&marca=Dell&ram=8GB
http://localhost:5000/api/produtos/tag/fone_de_ouvido?minPrice=150&maxPrice=400&marca=Sony&conexao=Bluetooth

Exemplo de url para adicionar imagem em produto:

http://localhost:5000/produtos/:produtoId/imagem (Content-Type multipart/form-data via header, e mandar imagem no body (key: "imagem", value: arquivo do seu computador))

Criar .env com os seguintes dados (alterar para os dados do seu banco local):

DB_HOST=127.0.0.1
DB_USER=empreender_local
DB_PASSWORD=123456
DB_NAME=soberano_geek
DB_PORT=5432