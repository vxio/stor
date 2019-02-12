import React from "react";
import PropTypes from 'prop-types';
import { Link, withRouter } from "react-router-dom";
import Select from "./GeneralUI/Select";
import styled from "styled-components";
import theme, { Grid, media, windowSizes } from "../theme";
import { spring, TransitionMotion } from "react-motion";
import OrderSummary from "./OrderSummary";
import XButton from "./GeneralUI/XButton";
import EmptyCart from "./EmptyCart";

const CartItem = props => {
  const { product, removeItem, updateQuantity, userOptionsEnabled } = props;
  const { name, size, link, totalPrice, quantity, img, brand, color } = product;
  let removeButton;

  return (
    <div style={props.style} ref={props.setRef}>
      <CartItemStyles>
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
              {userOptionsEnabled ? (
                <Select
                  name={"quantity range"}
                  selectedOption={quantity}
                  min={1}
                  max={10}
                  controlFunc={e => updateQuantity(e, product)}
                />
              ) : (
                <p style={{ marginLeft: ".5rem" }}> {quantity}</p>
              )}
            </div>
            <p>${totalPrice}</p>
          </div>
          {userOptionsEnabled && (
            <XButton
              setRef={buttonDOM => {
                removeButton = buttonDOM;
              }}
              onClick={() => {
                removeItem(product);
                removeButton.setAttribute("disabled", "disabled");
              }}
            />
          )}
        </div>
      </CartItemStyles>
    </div>
  );
};

const CartItemStyles = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  grid-column-gap: 4rem;
  /* box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2); */
  box-shadow: ${theme.boxShadow_border};
  padding: 2.3rem;
  backface-visibility: hidden;
  /* transition: ${theme.transition_hover}; */


  ${media.phone`
    grid-template-columns: 14rem 1fr;
    grid-column-gap: 2rem; 
    padding: 1.5rem;
  `} & > .image {
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
      font-size: 1.8rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      margin-right: 3.5rem;
      transition: all 0.2s ease;
      color: ${theme.black};
      &:hover {
        color: ${theme.primary};
      }
      & > *:nth-child(2) {
        color: ${theme.grey_6};
        font-weight: 400;
      }
      ${media.phone`
        font-size: 1.6rem;
      `};
    }

    .color-size {
      margin-bottom: 2rem;
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
`;

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
  }
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  render() {
    const { orderData, cart, subComponent, location, customerInfo, removeItem, userOptionsEnabled, updateQuantity } = this.props;
    const { width } = this.state;

    //setting height during render when using react-motion's spring()
    let cartItemContainer_height;
    if (width <= windowSizes.phone) {
      cartItemContainer_height = 160;
    } else if (width <= windowSizes.tabletLarge) {
      cartItemContainer_height = 210;
    } else if (width <= windowSizes.laptop) {
      cartItemContainer_height = 220;
    } else if (width <= windowSizes.desktop) {
      cartItemContainer_height = 240;
    } else {
      //width >= windowSizes.desktop
      cartItemContainer_height = 270;
    }

    function willLeave() {
      return {
        height: spring(0, { stiffness: 150, damping: 39 }),
        opacity: spring(0, { stiffness: 210 })
      };
    }

    const cartComponents = (
      <TransitionMotion
        willLeave={willLeave}
        styles={cart.map(cartItem => ({
          key: cartItem.id + cartItem.size,
          data: { product: cartItem },
          style: { height: cartItemContainer_height, opacity: 1 }
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
                  userOptionsEnabled={userOptionsEnabled}
                  removeItem={removeItem}
                  updateQuantity={updateQuantity}
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
          <EmptyCart />
        ) : (
          <CartCheckoutStyles>
            {cartComponents}
            <OrderSummary
              includeButtons={isCartPage === "cart"}
              id="order-summary"
              orderData={orderData}
              customerInfo={customerInfo}
            />
          </CartCheckoutStyles>
        )}
      </GridContainer>
    );
  }
}

export default withRouter(ShoppingCart);

ShoppingCart.propTypes = {
  orderData: PropTypes.object.isRequired,
  customerInfo: PropTypes.object,
  removeItem: PropTypes.func.isRequired,
  updateQuantity: PropTypes.func.isRequired,
  cart: PropTypes.array.isRequired,
  subComponent: PropTypes.bool,
  userOptionsEnabled: PropTypes.bool
};

export const CartCheckoutStyles = styled.div`
  grid-column: col-start 3 / full-end;
  display: grid;
  grid-template-columns: minmax(max-content, 1fr) auto;
  grid-gap: 4rem;

  ${media.tabletSmall`
   grid-column: full;
   grid-template-columns: 1fr;
   justify-content: center; 
   grid-gap: 2rem;
   #order-summary {
     grid-row: 1/2;
   }
  `};
`;
