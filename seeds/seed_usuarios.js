exports.seed = async function(knex) {
  await knex('usuarios').del();

  await knex('usuarios').insert([
      {
          nome: 'João Silva',
          sexo: 'Masculino',
          email: 'joao@gmail.com',
          senha: '123456',
          telefone: '11999999999',
          celular: '11988888888',
          endereco: 'Rua das Flores, 123',
          cidade: 'São Paulo',
          estado: 'SP',
          cep: '01010-000',
          data_nascimento: '1985-05-15',
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          nome: 'Maria Souza',
          sexo: 'Feminino',
          email: 'maria@gmail.com',
          senha: 'abcdef',
          telefone: '21999999999',
          celular: '21988888888',
          endereco: 'Avenida Brasil, 456',
          cidade: 'Rio de Janeiro',
          estado: 'RJ',
          cep: '22020-000',
          data_nascimento: '1990-10-22',
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          nome: 'Carlos Lima',
          sexo: 'Masculino',
          email: 'carlos@gmail.com',
          senha: '123abc',
          telefone: '31999999999',
          celular: '31988888888',
          endereco: 'Praça da Liberdade, 789',
          cidade: 'Belo Horizonte',
          estado: 'MG',
          cep: '30130-000',
          data_nascimento: '1978-03-10',
          created_at: new Date(),
          updated_at: new Date()
      }
  ]);
};
