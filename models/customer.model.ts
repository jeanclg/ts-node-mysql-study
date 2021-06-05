import { BasicCustomer, Customer } from "../types/customer.type";
import { db } from "../db";
import { OkPacket, RowDataPacket } from "mysql2";
import { customerRouter } from "../router/customer.router";

// Modelo que faz a query e retorna todos os usuarios cadastrados
export const findAll = (cb: Function) => {
  // Query do MySQL
  const queryString = "SELECT * FROM customer";
  // Faz a query no mysql retornando todos os usuarios cadastrados
  db.query(queryString, (err, result) => {
    if (err) cb(err);
    // Retorna os valores da query e atribui a variavel rows, do tipo array de RowData
    const rows = <RowDataPacket[]>result;
    // Variavel auxiliar para receber todos os usuarios que serão gerados no for
    const customers: Customer[] = [];

    rows.forEach((row) => {
      const customer: Customer = {
        id: row.id,
        name: row.name,
        password: row.password,
        email: row.email,
      };

      customers.push(customer);
    });

    cb(err, customers);
  });
};

// Modelo que faz a query de 1 elemento apenas
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

// Modelo quer cria um novo usuario
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

// Modelo que atualiza os dados do usuario
export const update = (customer: Customer, cb: Function) => {
  const queryString = `UPDATE customer SET name=?, email=?, password=? WHERE id=?`;

  db.query(
    queryString,
    [customer.name, customer.email, customer.password, customer.id],
    (err, result) => {
      if (err) cb(err);

      cb(null);
    }
  );
};

// Modelo que deleta do banco um usuario
export const deleteCustomer = (customerId: number, cb: Function) => {
  const queryString = `DELETE FROM customer WHERE id=?`;

  db.query(queryString, customerId, (err, result) => {
    if (err) cb(err);

    cb(null);
  });
};
