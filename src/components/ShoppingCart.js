import React from "react";
import { Link } from "react-router-dom";
import Button from "./GeneralUI/Button";
import Input from "./GeneralUI/Input";
import Select from "./GeneralUI/Select";

const CartItem = props => {
  const { product, index, removeItem, updateQuantity, userOptions } = props;
  console.log(props);
  return (
    <div>
      <h1>name: {product.name}</h1>
      <h3>size: {product.size}</h3>
      <h3>quantity: {product.quantity}</h3>
      <h3>totalPrice: {product.totalPrice}</h3>

      {userOptions ? (
        <Select
          name={"quantity range"}
          selectedOption={product.quantity}
          min={1}
          max={10}
          controlFunc={e => props.updateQuantity(e, index)}
        />
      ) : null}

      {userOptions ? <Button clicked={() => props.removeItem(index)}>Remove</Button> : null}
      <hr />
    </div>
  );
};

const ShoppingCart = props => {
  //do i need to convert the object into an array? or can i just leave it as an object an iterate through?
  //   let cartArray = Object.keys(props.cart).map(key => {
  //     return props.cart[key];
  //   });
  //   let cartComponents = cartArray.map((item, index) => (
  //     <CartItem key={index} item={item} removeItem={() => props.removeItem(index)} />
  //   ));
  console.log(props.cart);
  const cartComponents = props.cart.map((product, i) => (
    <CartItem
      key={i}
      product={product}
      index={i}
      userOptions={props.userOptions}
      removeItem={props.removeItem} //can put this in CartItem instead
      updateQuantity={props.updateQuantity}
    />
  ));

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
