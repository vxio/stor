import React from "react";
import { Link, withRouter } from "react-router-dom";
import Button from "./GeneralUI/Button";
import Input from "./GeneralUI/Input";
import Select from "./GeneralUI/Select";
import styled from "styled-components";
import theme, { Grid } from "../theme";
import { spring, TransitionMotion, presets } from "react-motion";
import Icon from "./Icon";
import { ICONS } from "./constants";
import OrderSummary from "./OrderSummary";
import LinkWithHoverEffect from "./LinkWithHoverEffect";

const CartEmpty = props => {
  return (
    <CartEmpty_Styles>
      <Icon className="cart-svg" icon={ICONS.EMPTY_CART} size={140} />
      <div className="text">
        <h1>Your cart is empty!</h1>
        <LinkWithHoverEffect id="linkToShop" to="/shop" size={18}>Continue shopping </LinkWithHoverEffect>
      </div>
    </CartEmpty_Styles>
  );
};
const CartEmpty_Styles = styled.div`
  grid-column: 1 / -1;
  margin: 4rem auto;
  display: flex;
  align-items: center;
  .cart-svg {
    display: inline-block;
    /* fill: ${theme.grey_2}; */
  }
  #linkToShop {
    margin-left: 0.2rem;
    margin-right: auto;
  }
  .text {
    margin-left: 6rem;
    display: flex;
    flex-direction: column;

    h1 {
      font-size: 5rem;
      margin-bottom: 2rem;
    }

  }
`;
const CartItem = props => {
  const { product, index, removeItem, updateQuantity, userOptions } = props;
  const { name, price, size, link, totalPrice, quantity, img, brand, color } = product;
  let removeButton;

  return (
    <div style={props.style}>
      <CartItem_Styles>
        <Link className="image" to={link}>
          <img src={img} alt={name} />
        </Link>

        <div className="product-info">
          <Link className="product-name-brand" to={link}>
            <div>{name}</div>
            <div>{brand}</div>
          </Link>

          <div className="color-size">
            <div>
              <span className="property">color:</span> <span>{color}</span>
            </div>
            <div>
              <span className="property">size:</span> <span>{size}</span>
            </div>
          </div>

          <div className="quantity-totalPrice">
            <div className="quantity">
              <p>quantity: </p>
              {(userOptions && (
                <Select
                  name={"quantity range"}
                  selectedOption={quantity}
                  min={1}
                  max={10}
                  controlFunc={e => props.updateQuantity(e, product)}
                />
              )) || <p style={{ marginLeft: ".5rem" }}> {quantity}</p>}
            </div>
            <p>${totalPrice}</p>
          </div>
          {userOptions && (
            <X_Button
              innerRef={buttonDOM => {
                removeButton = buttonDOM;
              }}
              onClick={() => {
                props.removeItem(product);
                removeButton.setAttribute("disabled", "disabled");
              }}
            >
              ✖
            </X_Button>
          )}
        </div>
      </CartItem_Styles>
    </div>
  );
};

const X_Button = styled.button`
  border: none;
  background: none;
  color: black;
  cursor: pointer;
  font-size: 1.4rem;
  padding-left: 1rem;

  position: absolute;
  top: 0;
  right: 0;
  &:hover {
    transition: all 0.2s;
    color: rgba(0, 0, 0, 0.5);
  }
  &:focus {
    outline: 0;
  }
`;

const CartItem_Styles = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  grid-column-gap: 4rem;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
  padding: 2.3rem ;
  backface-visibility: hidden;

}
  & > .image {
    grid-column: 1/2;
    img {
      width: 100%;
      height: auto;
      vertical-align: middle;
    }
    &:hover ~ div .product-name-brand {
        color: ${theme.primary};
    }
  }

  & > .product-info {
    grid-column: 2/3;
    text-transform: capitalize;
    font-size: 1.6rem;
    display: flex;
    flex-direction: column;
    position: relative;

    .product-name-brand {
      width: max-content; 
      font-size: 1.8rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      margin-right: 3.5rem;
      transition: all .2s ease;
        color: ${theme.black};
        &:hover {
          color: ${theme.primary};
        }
      & > *:nth-child(2) {
        /* font-size: 1.4rem; */
        color: ${theme.grey_6}; 
        font-weight: 400;
      }
    }

    .color-size {
      /* margin-bottom: 0.6rem; */
}
     }
    .quantity-totalPrice {
      display: flex;
      margin-top: auto;
      justify-content: space-between;
    }

    .quantity {
      display: flex;
      select {
        font-family: "Karla";
        font-size: 1.6rem;
        border: 1px solid #ccc;
        border-radius: 3px;
        margin-left: 0.6rem;
        overflow: hidden;

        &:focus {
          outline: none;
        }

        }
      }
    }
  }
`;

const ShoppingCart = props => {
  const { orderData, cart, subComponent, location, customerInfo } = props;

  function willLeave() {
    // triggered when c's gone. Keeping c until its width/height reach 0. ,
    // return { height: spring(0, {stiffness: 150, damping: 34}), opacity: spring(0, { stiffness: 210 }), paddingTop: spring(0, {stiffness: 210}), border: 0 };
    return { height: spring(0, { stiffness: 150, damping: 39 }), opacity: spring(0, { stiffness: 210 }) };
  }

  const cartComponents = (
    <TransitionMotion
      willLeave={willLeave}
      styles={cart.map(cartItem => ({
        key: cartItem.id + cartItem.size,
        data: { product: cartItem },
        style: { height: 240, opacity: 1 }
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

  let GridContainer;
  if (subComponent) {
    GridContainer = React.Fragment;
  } else {
    GridContainer = Grid;
  }

  const isCartPage = location.pathname.split("/")[1];

  return (
    <GridContainer>
      {!cart.length ? (
        <CartEmpty />
      ) : (
        <Cart_Checkout_Styled>
          <CartItemsContainer>{cartComponents}</CartItemsContainer>
          <OrderSummary
            includeButtons={isCartPage === "cart"}
            id="order-summary"
            orderData={orderData}
            customerInfo={customerInfo}
          />
        </Cart_Checkout_Styled>
      )}
    </GridContainer>
  );
};

export default withRouter(ShoppingCart);

const CartItemsContainer = styled.div`
  /* grid-column: col-start 1 / span 7; */
  /* width: 100%; */
`;

export const Cart_Checkout_Styled = styled.div`
  grid-column: col-start 2 / full-end;
  /* grid-column: full; */
  display: grid;
  grid-template-columns: minmax(max-content, 1fr) 45rem;
  grid-gap: 4rem;
  /* justify-items: end; */
  /* & > *:first-child {
    margin-right: 5rem;
  }  */
`;
