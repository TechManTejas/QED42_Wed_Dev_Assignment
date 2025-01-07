import { Product } from "./product.types";

export interface CartItem {
  product: Product;
  quantity: number;
}

// Define the Cart type which is an array of CartItems
export interface Cart {
  items: CartItem[];
  totalAmount: number;
  totalQuantity: number;
}
