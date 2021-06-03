import express, { Request, Response } from "express";
import * as customerModel from "../models/customer.model";
import { BasicCustomer, Customer } from "../types/customer.type";

const customerRouter = express.Router();

// Buscar dados de uma order
customerRouter.get("/:id", (req: Request, res: Response) => {
  // Pega o valor do id passado pela URL e atribui a variavel id
  const id: number = Number(req.params.id);
  // Usa a função que esta no order.model
  customerModel.findOne(id, (err: Error, customer: Customer) => {
    if (err) return res.status(500).json(err);

    res.status(200).json({ data: customer });
  });
});

export { customerRouter };
