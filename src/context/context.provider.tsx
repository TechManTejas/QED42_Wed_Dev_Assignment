import React, { createContext, useState, ReactNode, useContext } from 'react';


// Create the context
const MyContext = createContext<any | undefined>(undefined);

// Create a provider component
export const MyContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [selectedCategory, setSelectedCategory] = useState<string>("all categories");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [cartQuantity, setCartQuantity] = useState<number>(0);
    const [cartAmount, setCartAmount] = useState<number>(0);

  const contextValue: any = {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    cartQuantity,
    setCartQuantity,
    cartAmount,
    setCartAmount,
  };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
};

// Create a custom hook to use the context
export const Context = (): any => {
    const context = useContext(MyContext);
    if (!context) {
      throw new Error('useMyContext must be used within a MyContextProvider');
    }
    return context;
  };