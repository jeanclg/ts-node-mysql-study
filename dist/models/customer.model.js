"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOne = void 0;
const db_1 = require("../db");
// Modelo que faz a Query de 1 elemento apenas
const findOne = (orderId, cb) => {
    // Query do MySQL
    const queryString = "SELECT * FROM customer WHERE customer.id=?";
    // Faz a query no mysql a partir da variavel queryString com o orderId
    db_1.db.query(queryString, orderId, (err, result) => {
        if (err)
            cb(err);
        // Pega o resultado da Query do tipo RowDataPacket e atribui a variavel row
        const row = result[0];
        console.log(row);
        // Modelo da linha que esta sendo retornada
        const customer = {
            id: row.id,
            name: row.name,
            password: row.password,
            email: row.email,
        };
        // Callback que caso não tenha erros envia para a rota a linha recebida na query
        cb(err, customer);
    });
};
exports.findOne = findOne;
