import { CartIcon } from "constants/index";
import { ShoppingCardContext } from "contextAPI/index";
import React, { useContext, useMemo } from "react";
import { Link } from "react-router-dom";

import "./header.scss";

const Header = () => {
  const { cartList } = useContext(ShoppingCardContext);
  const quantityCheck = () => {
    return cartList.reduce((prev, cart) => prev + cart?.usedQuantity, 0);
  };

  const calculateCart = useMemo(() => quantityCheck(), [cartList]);

  return (
    <header className="header">
      <div className="container">
        <Link to={"/"}>
          {" "}
          <h2>TeeRex Store</h2>
        </Link>
        <div className="headerLinks">
          <Link to="/">Products</Link>
          <Link to="/shopping-cart">
            <CartIcon />
            <span>{calculateCart}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
