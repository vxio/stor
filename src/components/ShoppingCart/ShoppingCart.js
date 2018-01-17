import React from "react";
import { Link } from "react-router-dom";

import ShoppingCartItem from "./ShoppingCartItem/ShoppingCartItem";

const ShoppingCart = props => {
  //do i need to convert the object into an array? or can i just leave it as an object an iterate through?
  //   let cartArray = Object.keys(props.cart).map(key => {
  //     return props.cart[key];
  //   });
  //   let cartComponents = cartArray.map((item, index) => (
  //     <ShoppingCartItem key={index} item={item} removeItem={() => props.removeItem(index)} />
  //   ));

  let cartComponents = [];
  for (let product in props.cart) {
    cartComponents.push(
      <ShoppingCartItem
        key={product}
        productId={product}
        item={props.cart[product]}
        removeItem={() => props.removeItem(product)} //can put this in shoppingcartItem instead
        updateQuantity={props.updateQuantity}
      />
    );
  }
  console.log(props)
  return (
    <div>
      <h1># of items in cart: {props.numOfItems}</h1>
      {cartComponents}
      <Link to="/">
        <button>proceed to whatever</button>
      </Link>
    </div>
  );
};

export default ShoppingCart;
