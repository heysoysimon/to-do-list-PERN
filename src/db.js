//se conecta a la base de datos 
// usar pg para conectar a posgrest 
const { Pool } = require("pg");
const { db } = require("./config");

const pool = new Pool({
  user: db.user,
  password: db.password,
  host: db.host,
  port: db.port,
  database: db.database,
});

module.exports = pool;