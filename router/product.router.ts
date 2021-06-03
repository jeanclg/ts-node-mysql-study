import express, { Request, Response } from "express";
import * as productModel from "../models/product.model";
import { BasicProduct, Product } from "../types/product.type";

const productRouter = express.Router();

// Buscar dados de uma order
productRouter.get("/:id", async (req: Request, res: Response) => {
  // Pega o valor do id passado pela URL e atribui a variavel id
  const id: number = Number(req.params.id);
  // Usa a função que esta no order.model
  productModel.findOne(id, (err: Error, product: Product) => {
    if (err) return res.status(500).json(err);

    res.status(200).json({ data: product });
  });
});

productRouter.post("/signup", async (req: Request, res: Response) => {
  const newProduct: Product = req.body;

  productModel.create(newProduct, (err: Error, product: Product) => {
    if (err) return res.status(500).json(500);

    res.status(201).json({ data: newProduct });
  });
});

export { productRouter };
