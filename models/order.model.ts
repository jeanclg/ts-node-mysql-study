import { BasicOrder, Order, OrderWithDetails } from "../types/order.type";
import { db } from "../db";
import { OkPacket, RowDataPacket } from "mysql2";

// Modelo que faz a Query de 1 elemento apenas
export const findOne = (orderId: number, cb: Function) => {
  // Query do MySQL
  const queryString = `
    "SELECT 
    product_order.*,
      product.*,
      customer.name,
      customer.email
    FROM product_order
    INNER JOIN customer ON customer.id=product_order.customer_id
    INNER JOIN product ON product.id=product_order.product_id
    WHERE product_order.order_id=?"`;
  // Faz a query no mysql a partir da variavel queryString com o orderId
  db.query(queryString, orderId, (err, result) => {
    if (err) {
      cb(err);
    }
    // Pega o resultado da Query do tipo RowDataPacket e atribui a variavel row
    const row = (<RowDataPacket>result)[0];
    console.log(row);
    // Modelo da linha que esta sendo retornada
    const order: OrderWithDetails = {
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
