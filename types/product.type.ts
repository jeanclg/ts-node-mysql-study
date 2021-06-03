export interface BasicProduct {
  id: number;
}

export interface Product extends BasicProduct {
  name: string;
  description: string;
  instock_quantity: number;
  price: number;
}
