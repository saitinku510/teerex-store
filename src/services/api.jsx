// "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json" api url

const GET_SHOPPING_CART_URL =
  "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json";

export const getShoppingList = async () => {
  const response = await fetch(GET_SHOPPING_CART_URL);
  const data = await response.json();
  return data;
};
