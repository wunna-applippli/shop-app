export interface Product {
  id: number;
  product_code: string;
  product_name: string;
  description: string;
  price: number;
  discount_amount: number;
  available: boolean;
  photo: string;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}