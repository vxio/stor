import React from "react";
import styled from "styled-components";
import Input from "components/UI/Input/Input";
import RadioInput from "components/UI/Input/RadioInput/RadioInput";
import WarningText from "components/WarningText/WarningText";

let sizeOptions = [
  { value: "extra small", displayValue: "XS" },
  { value: "small", displayValue: "S" },
  { value: "medium", displayValue: "M" },
  { value: "large", displayValue: "L" },
  { value: "extra large", displayValue: "XL" }
];

const ProductPage = props => {
  const product = props.product;
  window.scrollTo(0, 0);
  // props.getCurrentProdcut(product)
  console.log(props)

  return (
    <div>
      <WarningText>This is a warning bietch</WarningText>
      <h1>This is the product page of {product.name}</h1>
      <h2>${product.price}</h2>
      <hr />
      <h4>Choose size: __</h4>
      <h4>Quantity: {product.quantity}</h4>
      <form onSubmit={props.addToCart}>
        <RadioInput inputValues={sizeOptions} changed={props.sizeChange} />

        <button>Add to Cart</button>
      </form>
    </div>
  );
};

export default ProductPage;
