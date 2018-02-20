import React from "react";
import { Link } from "react-router-dom";
import Button from "./GeneralUI/Button";
import Input from "./GeneralUI/Input";
import Select from "./GeneralUI/Select";
import styled from "styled-components";
import theme from "../theme";
import { spring, TransitionMotion, presets } from "react-motion";

const CartItem = props => {
  const { product, index, removeItem, updateQuantity, userOptions } = props;
  
  return (
    <CartItem_Styles style={props.style}>
      <Link className="image" to={`/store/${product.name}`}>
        <img src={product.img} alt={product.img} />
      </Link>

      <div className="product-info">
        <Link className="product-name" to={`/store/${product.name}`}>
          {product.name}
        </Link>
        <p className="size-price">
          size: {product.size} <br /> price: ${product.price}
        </p>

        <div className="quantity-totalPrice">
          <div className="quantity">
            quantity:{userOptions && (
              <Select
                name={"quantity range"}
                selectedOption={product.quantity}
                min={1}
                max={10}
                controlFunc={e => props.updateQuantity(e, index)}
              />
            )}
          </div>
          <p>${product.totalPrice}</p>
        </div>
        {userOptions && <X_Button onClick={() => props.removeItem(product)}>✖</X_Button>}
      </div>
    </CartItem_Styles>
  );
};

const X_Button = styled.button`
  border: none;
  background: none;
  color: black;
  cursor: pointer;
  font-size: 1.4rem;

  position: absolute;
  top: 0;
  right: 0;
  &:hover {
    color: rgba(0, 0, 0, 0.5);
  }
`;

const CartItem_Styles = styled.div`
  display: grid;
  grid-template-columns: 10rem 25rem;
  grid-column-gap: 2rem;
  font-size: 1.4rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 2rem 0;
  backface-visibility: hidden;

  & > .image {
    grid-column: 1/2;

    img {
      width: 100%;
      /* height: 100%; */
      vertical-align: middle;
      &:hover {
        filter: brightness(95%);
      }
    }
  }

  & > .product-info {
    grid-column: 2/3;
    text-transform: capitalize;
    font-size: 1.3rem;
    display: flex;
    flex-direction: column;
    position: relative;

    .product-name {
      font-size: 1.5rem;
      margin-bottom: 0.6rem;
      margin-right: auto;
    }

    .size-price {
      margin-bottom: 0.6rem;
    }
    .quantity-totalPrice {
      display: flex;
      margin-top: auto;
      justify-content: space-between;
    }

    .quantity {
      display: flex;
      select {
        margin-left: 0.6rem;
      }
    }
  }
`;

const ShoppingCart = props => {
  
  const { orderData, cart } = props;

  function willLeave() {
    // triggered when c's gone. Keeping c until its width/height reach 0. ,
    return { height: spring(0), opacity: spring(0, { stiffness: 210 }), padding: 0, border: 0 };
  }

  const cartComponents = (
    <TransitionMotion
      willLeave={willLeave}
      styles={cart.map(cartItem => ({
        key: cartItem.id + cartItem.size,
        data: { product: cartItem },
        style: { height: 160, opacity: 1 }
      }))}
    >
      {interpolatedStyles => (
        <div>
          {interpolatedStyles.map((config, i) => {
            return (
              <CartItem
                product={config.data.product}
                key={config.key}
                index={i}
                userOptions={props.userOptions}
                removeItem={props.removeItem}
                updateQuantity={
                  props.updateQuantity //can put this in CartItem instead
                }
                style={{ ...config.style }}
              />
            );
          })}
        </div>
      )}
    </TransitionMotion>
  );

  return (
    <Container>
      <CartItemsContainer>{cartComponents}</CartItemsContainer>
      <OrderSummaryContainer>
        <OrderSummary>
          <h2>Order Summary</h2>
          <p className="subtotal">
            <span>Subtotal:</span> {orderData.subTotal}
          </p>
          <p>
            <span>Shipping:</span> {orderData.shipping}
          </p>
          <p>
            <span>Tax:</span> {orderData.tax}
          </p>
          <p className="total">
            <span>Total:</span> {orderData.total}
          </p>
        </OrderSummary>

        <Link className="" to="/">
          <button>Continue to checkout</button>
        </Link>
      </OrderSummaryContainer>
    </Container>
  );
};

export default ShoppingCart;

const Container = styled.div`
  grid-column: full;
  display: grid;
  grid-template-columns: max-content minmax(0, 12rem) max-content;

  & > .order-summary-container {
    grid-column: 3/4;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

const OrderSummaryContainer = styled.div`
  grid-column: 3/4;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  /* background-color: ${theme.dark}; */
  /* font-family: ${theme.baseFontFamily}; */

  & > a {
    margin-top: 1rem;
  }
`;

const CartItemsContainer = styled.div`
  grid-column: 1/2;
`;

const OrderSummary = styled.div`
  font-size: 1.5rem;
  border: 1px solid grey;
  padding: 2rem;

  & > * {
    display: flex;
    justify-content: space-between;
  }

  .subtotal {
    margin: 2rem 0;
  }
  .total {
    margin-top: 2rem;
  }
`;
