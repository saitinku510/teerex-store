import CheckoutCard from "components/checkoutCard/index";
import { ShoppingCardContext } from "contextAPI/index";
import React, { useContext, useMemo } from "react";

import "./cart.scss";

const Cart = () => {
  const { cartList, setCartList, cardList, setCardList } =
    useContext(ShoppingCardContext);

  const priceOverall = () => {
    return cartList?.reduce(
      (prev, cart) => prev + cart?.price * cart?.usedQuantity,
      0
    );
  };

  console.log("AAA", cartList);

  const calculateOverallPrice = useMemo(() => priceOverall(), [cartList?.length]);

  const deleteCart = (id) => {
    const filterData = cartList.filter((cart) => cart.id !== id);
    const result = cardList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          usedQuantity: 0
        };
      }
      return item;
    });
    setCartList(filterData);
    setCardList(result);
  };

  return (
    <section className="cart">
      <div className="container">
        <h1>Shopping Cart</h1>
        <div className="cartContent">
          {cartList.map((cart, index) => (
            <CheckoutCard key={index} cartDetails={cart} deleteCart={deleteCart} />
          ))}
        </div>
        <h4>
          Total amount <span>Rs. {calculateOverallPrice}</span>
        </h4>
      </div>
    </section>
  );
};

export default Cart;
