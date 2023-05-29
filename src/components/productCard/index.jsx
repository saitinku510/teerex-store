import React from "react";

const ProductCard = ({ cardDetails, addToCart, cardId }) => {
  const { name, imageURL, price, quantity, usedQuantity } = cardDetails;

  const incrementCart = () => {
    addToCart({ ...cardDetails, usedQuantity: 1 }, cardId);
  };

  const increment = () => {
    if (usedQuantity + 1 > quantity) {
      alert("Cannot exceed stock quantity");
      return;
    }
    addToCart({ ...cardDetails, usedQuantity: usedQuantity + 1 }, cardId);
  };

  const decrement = () => {
    if (usedQuantity > 0) {
      addToCart({ ...cardDetails, usedQuantity: usedQuantity - 1 }, cardId);
    } else {
      addToCart({ ...cardDetails, usedQuantity: 0 }, cardId);
    }
  };

  return (
    <div className="productCard">
      <div className="productCardImg">
        <h2>{name}</h2>
        <img src={imageURL} alt="cardImg" />
      </div>
      <div className="productCardDetails">
        <h4>Rs {price}</h4>
        {usedQuantity > 0 ? (
          <div className="productCardDetailsIncrement">
            <button onClick={decrement}>-</button>
            {usedQuantity}
            <button onClick={increment}>+</button>
          </div>
        ) : (
          <p onClick={() => incrementCart()}>Add to cart</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
