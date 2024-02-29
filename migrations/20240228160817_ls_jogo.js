
exports.up = function(knex) {
    return knex.schema.createTable('ls_jogo', (table) => {
      table.bigIncrements('cd_jogo').primary().notNullable();
      table.string('nm_jogo', 100).unique().notNullable();
      table.datetime('dt_inicial');
      table.datetime('dt_final');
      table.float('nt_avaliacao');
      table.integer('cd_status').unsigned().notNullable();
      table.string('img_jogo', 200);

      table.foreign('cd_status')
        .references('cd_status') 
        .inTable('status_jogo')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('ls_jogo');
  };