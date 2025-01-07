import React, { createContext, useState, ReactNode, useContext } from "react";
import { Cart, CartItem } from "../types/cart.types";
import { Product } from "../types/product.types";

// Create the context
const MyContext = createContext<any | undefined>(undefined);

// Create a provider component
export const MyContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedCategory, setSelectedCategory] =
    useState<string>("all categories");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("price-low-high");
  const [cart, setCart] = useState<Cart>({
    items: [],
    totalAmount: 0,
    totalQuantity: 0,
  });

  // Add a product to the cart
  const addToCart = (product: Product, quantity: number) => {
    const existingCartItemIndex = cart.items.findIndex(
      (item) => item.product.id === product.id
    );
    let updatedCartItems: CartItem[];

    if (existingCartItemIndex >= 0) {
      // If the product already exists in the cart, update the quantity
      updatedCartItems = [...cart.items];
      updatedCartItems[existingCartItemIndex].quantity += quantity;
    } else {
      // If the product is new to the cart, add it as a new item
      updatedCartItems = [...cart.items, { product, quantity }];
    }

    // Update the cart's total amount and quantity
    const updatedTotalAmount = updatedCartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    const updatedTotalQuantity = updatedCartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );

    setCart({
      items: updatedCartItems,
      totalAmount: updatedTotalAmount,
      totalQuantity: updatedTotalQuantity,
    });

    console.log(JSON.stringify(cart))
  };

  // Remove a product from the cart
  const removeFromCart = (productId: number) => {
    const updatedCartItems = cart.items.filter(
      (item) => item.product.id !== productId
    );

    const updatedTotalAmount = updatedCartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    const updatedTotalQuantity = updatedCartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );

    setCart({
      items: updatedCartItems,
      totalAmount: updatedTotalAmount,
      totalQuantity: updatedTotalQuantity,
    });

    console.log(JSON.stringify(cart))
  };

  // Update the quantity of a specific product in the cart
  const updateCartQuantity = (productId: number, newQuantity: number) => {
    const updatedCartItems = cart.items.map((item) =>
      item.product.id === productId ? { ...item, quantity: newQuantity } : item
    );

    const updatedTotalAmount = updatedCartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    const updatedTotalQuantity = updatedCartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );

    setCart({
      items: updatedCartItems,
      totalAmount: updatedTotalAmount,
      totalQuantity: updatedTotalQuantity,
    });

    console.log(JSON.stringify(cart))
  };

  const contextValue: any = {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortOption,
    setSortOption,
    cart, 
    addToCart,
    removeFromCart,
    updateCartQuantity
  };

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};

// Create a custom hook to use the context
export const Context = (): any => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};
