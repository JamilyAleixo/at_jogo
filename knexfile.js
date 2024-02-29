 module.exports = {

    client: 'mssql',
    connection: {
      server: '121.1.1.10',
      user: 'estagiarios',
      password: 'est2024#Vozes',
      database: 'estagiarios',
      options: {
        encrypt: false, 
    },
  },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  };

