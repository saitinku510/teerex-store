import { createContext, useState } from "react";

export const ShoppingCardContext = createContext(null);

export const ContextProvider = ({ children }) => {
  const [cartList, setCartList] = useState([]);
  const [cardList, setCardList] = useState([]);
  return (
    <ShoppingCardContext.Provider
      value={{ cartList, setCartList, cardList, setCardList }}
    >
      {children}
    </ShoppingCardContext.Provider>
  );
};
