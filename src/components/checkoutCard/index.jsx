import React from "react";

const CheckoutCard = ({ cartDetails, deleteCart }) => {
  const { name, imageURL, price, id, usedQuantity } = cartDetails;

  return (
    <div className="cartContentList">
      <div className="cartContentImg">
        <img src={imageURL} alt="cartImg" />
      </div>
      <h2>
        {name} <span>Rs. {price}</span>
      </h2>
      <select value={usedQuantity} disabled>
        <option value="1">Qty: 1</option>
        <option value="2">Qty: 2</option>
        <option value="3">Qty: 3</option>
      </select>
      <p onClick={() => deleteCart(id)}>Delete</p>
    </div>
  );
};

export default CheckoutCard;
