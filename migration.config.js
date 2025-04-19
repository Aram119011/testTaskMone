
require('dotenv').config();
console.log(process.env);


module.exports = {
  migrationsTable: 'pgmigrations',
  dir: 'migrations',
  direction: 'up',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME || 'm1db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'admin',
  databaseUrl: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
};