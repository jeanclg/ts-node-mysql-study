import { BasicCustomer, Customer } from "./customer.type";
import { BasicProduct, Product } from "./product.type";

export interface BasicOrder {
  product: BasicProduct;
  customer: BasicCustomer;
  product_quantity: number;
}

export interface Order extends BasicOrder {
  orderId: number;
}

export interface OrderWithDetails extends Order {
  product: Product;
  customer: Customer;
}
