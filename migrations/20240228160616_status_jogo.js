exports.up = function(knex) {
  return knex.schema.createTable('status_jogo', (table) => {
    table.increments('cd_status').primary();  
    table.string('ds_status', 25).notNullable();
    table.integer('cd_ordem').notNullable();
  })
  .then(() => {
    
    return knex('status_jogo').insert([
      { ds_status: 'jogando', cd_ordem: 3 },
      { ds_status: 'comprando', cd_ordem: 2 },
      { ds_status: 'desejado', cd_ordem: 1 },
      { ds_status: 'arquivado', cd_ordem: 4 },
      { ds_status: 'desistiu', cd_ordem: 5 },
      { ds_status: 'zerado', cd_ordem: 6 }
    ]);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('status_jogo');
};
