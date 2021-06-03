"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOne = void 0;
const db_1 = require("../db");
// Modelo que faz a Query de 1 elemento apenas
const findOne = (orderId, cb) => {
    // Query do MySQL
    const queryString = `
    SELECT 
    product_order.*,
      product.*,
      customer.name,
      customer.email
    FROM product_order
    INNER JOIN customer ON customer.id=product_order.customer_id
    INNER JOIN product ON product.id=product_order.product_id
    WHERE product_order.order_id=?`;
    // Faz a query no mysql a partir da variavel queryString com o orderId
    db_1.db.query(queryString, orderId, (err, result) => {
        if (err) {
            cb(err);
        }
        // Pega o resultado da Query do tipo RowDataPacket e atribui a variavel row
        const row = result[0];
        console.log(row);
        // Modelo da linha que esta sendo retornada
        const order = {
            orderId: row.order_id,
            customer: {
                id: row.customer_id,
                name: row.customer_name,
                email: row.email,
            },
            product: {
                id: row.product_id,
                name: row.name,
                description: row.description,
                inStockQuantity: row.instock_quantity,
                price: row.price,
            },
            productQuantity: row.product_quantity,
        };
        // Callback que caso não tenha erros envia para a rota a linha recebida na query
        cb(null, order);
    });
};
exports.findOne = findOne;
