import { Order, OrderWithDetails } from "../types/order.type";
import { db } from "../db";
import { OkPacket, RowDataPacket } from "mysql2";

// Modelo que faz a Query de 1 elemento apenas
export const findOne = (orderId: number, cb: Function) => {
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
  db.query(queryString, orderId, (err, result) => {
    if (err) {
      cb(err);
    }
    // Pega o resultado da Query do tipo RowDataPacket e atribui a variavel row
    const row = (<RowDataPacket>result)[0];
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
        instock_quantity: row.instock_quantity,
        price: row.price,
      },
      product_quantity: row.product_quantity,
    };
    // Callback que caso não tenha erros envia para a rota a linha recebida na query
    cb(null, order);
  });
};

// Modelo da query que busca todas as ordens
export const findAll = (callback: Function) => {
  const queryString = `
  SELECT 
  product_order.*,
    product.*,
    customer.name,
    customer.email
  FROM product_order
  INNER JOIN customer ON customer.id=product_order.customer_id
  INNER JOIN product ON product.id=product_order.product_id`;

  db.query(queryString, (err, result) => {
    if (err) {
      callback(err);
    }

    const rows = <RowDataPacket[]>result;
    const orders: Order[] = [];
    console.log(rows);
    rows.forEach((row) => {
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
          instock_quantity: row.instock_quantity,
          price: row.price,
        },
        product_quantity: row.product_quantity,
      };
      orders.push(order);
    });
    callback(err, orders);
  });
};
