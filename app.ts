import express from "express";
import * as dotenv from "dotenv";
import { orderRouter } from "./router/order.router";
import { customerRouter } from "./router/customer.router";
import { productRouter } from "./router/product.router";

const app = express();
dotenv.config();

app.use(express.json());

app.use("/orders", orderRouter);
app.use("/users", customerRouter);
app.use("/products", productRouter);

app.listen(Number(process.env.PORT), () => {
  console.log("Server On");
});
