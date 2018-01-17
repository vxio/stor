import React from "react";
import Button from "components/Button/Button";
import Input from "components/UI/Input/Input";
import Counter from "components/Counter/Counter";
import Select from "components/UI/Input/Select/Select";

const ShoppingCartItem = props => {
  return (
    <div>
      <h1>name: {props.item.name}</h1>
      <h3>size: {props.item.size}</h3>
      <h3>quantity: {props.item.quantity}</h3>

      <Select
        name={"quantity range"}
        selectedOption={props.item.quantity}
        min={1}
        max={10}
        controlFunc={e => props.updateQuantity(e, props.productId)}
      />

      <Button clicked={props.removeItem}>Remove</Button>
      <hr />
    </div>
  );
};

export default ShoppingCartItem;
