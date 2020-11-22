// Require le module PG
const { Client } = require('pg');
// Creer un client
const client = new Client(process.env.PG_URL_DEV);
// Connect le client
client.connect();
// J'exporte le module
module.exports = client;