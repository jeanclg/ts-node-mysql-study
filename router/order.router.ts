import express, { Request, Response } from "express";
import * as orderModel from "../models/order.model";
import { Order, BasicOrder } from "../types/order.type";

const orderRouter = express.Router();

// Buscar dados de uma order
orderRouter.get("/:id", async (req: Request, res: Response) => {
  // Pega o valor do id passado pela URL e atribui a variavel id
  const id: number = Number(req.params.id);
  // Usa a função que esta no order.model
  orderModel.findOne(id, (err: Error, order: Order) => {
    if (err) return res.status(500).json({ message: err.message });

    res.status(200).json({ data: order });
  });
});

export { orderRouter };
