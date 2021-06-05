import express, { Request, Response } from "express";
import * as customerModel from "../models/customer.model";
import { Customer } from "../types/customer.type";

const customerRouter = express.Router();

// Buscar dados de todos os usuarios
customerRouter.get("/all", async (req: Request, res: Response) => {
  customerModel.findAll((err: Error, customers: Customer[]) => {
    if (err) return res.status(500).json(err);

    res.status(200).json({ data: customers });
  });
});

// Buscar dados de um usuario
customerRouter.get("/:id", async (req: Request, res: Response) => {
  // Pega o valor do id passado pela URL e atribui a variavel id
  const id: number = Number(req.params.id);
  // Usa a função que esta no order.model
  customerModel.findOne(id, (err: Error, customer: Customer) => {
    if (err) return res.status(500).json(err);

    res.status(200).json({ data: customer });
  });
});

// Cadastrar um novo usuario
customerRouter.post("/signup", async (req: Request, res: Response) => {
  const newCustomer: Customer = req.body;

  customerModel.create(newCustomer, (err: Error, customer: Customer) => {
    if (err) return res.status(500).json(err);

    res.status(201).json({ data: newCustomer });
  });
});

// Atualizar dados de um usuario
customerRouter.put("/update/:id", async (req: Request, res: Response) => {
  const customer: Customer = req.body;

  customerModel.update(customer, (err: Error, newCustomer: Customer) => {
    if (err) return res.status(500).json(err);

    res.status(200).send();
  });
});

// Deleter um usuario
customerRouter.delete("/delete/:id", async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);

  customerModel.deleteCustomer(id, (err: Error, removedCustomer: Customer) => {
    if (err) return res.status(500).json(err);

    res.status(200).json({});
  });
});

export { customerRouter };
