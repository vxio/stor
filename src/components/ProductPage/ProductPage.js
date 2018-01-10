import React from "react";
import styled from "styled-components";
import Input from "components/UI/Input/Input";

let productData = {
  size: null
};

const ProductPage = props => {
  const product = props.product;
  window.scrollTo(0, 0);
  return (
    <div>
      <h1>This is the product page of {product.name}</h1>
      <h2>${product.price}</h2>
      <hr />
      <h4>Choose size: __</h4>
      <h4>Quantity: {product.quantity}</h4>
      <form onSubmit={props.purchase}>
        <Input
          elementType="select"
          elementConfig={{
            options: [{ value: "large", displayValue: "Large" }, { value: "medium", displayValue: "Medium" }]
          }}
          changed={props.inputChange}
        />
        <button>Add to Cart</button>
      </form>
    </div>
  );
};

export default ProductPage;
