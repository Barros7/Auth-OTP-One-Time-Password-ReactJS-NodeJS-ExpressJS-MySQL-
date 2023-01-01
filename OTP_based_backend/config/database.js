const postgres = require('pg').Pool;
require('dotenv').config();

const {user, host, database, password, port} = process.env;
const conexaoBaseDados = new postgres({ user, host, database, password, port, });

try {
    conexaoBaseDados.connect();
    console.log("Base de dados conectada com sucesso!");
} catch (erro) {
    console.log(`Erro ao conectar a base de dados! \n Erro: ${erro}`);
}

module.exports = { conexaoBaseDados };