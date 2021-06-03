import { BasicCustomer, Customer } from "../types/customer.type";
import { db } from "../db";
import { OkPacket, RowDataPacket } from "mysql2";
import { Cipher } from "crypto";

// Modelo que faz a Query de 1 elemento apenas
export const findOne = (orderId: number, cb: Function) => {
  // Query do MySQL
  const queryString = "SELECT * FROM customer WHERE customer.id=?";
  // Faz a query no mysql a partir da variavel queryString com o orderId
  db.query(queryString, orderId, (err, result) => {
    if (err) cb(err);
    // Pega o resultado da Query do tipo RowDataPacket e atribui a variavel row
    const row = (<RowDataPacket>result)[0];
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

export const create = (customer: Customer, cb: Function) => {
  // Query do MySQL
  const queryString =
    "INSERT INTO customer (name, password, email) VALUES (?, ?, ?)";
  // Faz a query no mysql passando os valores a ser inputados no segundo parametro da função
  db.query(
    queryString,
    [customer.name, customer.password, customer.email],
    (err, result) => {
      if (err) cb(err);

      const insertId = (<OkPacket>result).insertId;
      // Callback que caso não tenha erros cadastra um novo customer
      cb(err, insertId);
    }
  );
};
