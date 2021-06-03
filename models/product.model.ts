import { BasicProduct, Product } from "../types/product.type";
import { db } from "../db";
import { RowDataPacket, OkPacket } from "mysql2";

// Modelo que faz a Query de 1 elemento apenas
export const findOne = (orderId: number, cb: Function) => {
  // Query do MySQL
  const queryString = "SELECT * FROM product WHERE product.id=?";
  // Faz a query no mysql a partir da variavel queryString com o orderId
  db.query(queryString, orderId, (err, result) => {
    if (err) cb(err);
    // Pega o resultado da Query do tipo RowDataPacket e atribui a variavel row
    const row = (<RowDataPacket>result)[0];
    console.log(row);
    // Modelo da linha que esta sendo retornada
    const product = {
      id: row.id,
      name: row.name,
      description: row.description,
      instock_quantity: row.instock_quantity,
      price: row.price,
    };
    // Callback que caso não tenha erros envia para a rota a linha recebida na query
    cb(err, product);
  });
};

export const create = (product: Product, cb: Function) => {
  const queryString =
    "INSERT INTO product (name, description, instock_quantity, price) VALUES (?, ?, ?, ?)";

  db.query(
    queryString,
    [
      product.name,
      product.description,
      product.instock_quantity,
      product.price,
    ],
    (err, result) => {
      if (err) cb(err);

      const insertId = (<OkPacket>result).insertId;
      cb(err, insertId);
    }
  );
};
