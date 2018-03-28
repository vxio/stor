import React from "react";
import styled from "styled-components";
import OrderSummary from "./OrderSummary";
import { Link, Redirect } from "react-router-dom";
import theme, { Grid, media } from "../theme";
import ShoppingCart from "./ShoppingCart";
import Button from "./GeneralUI/Button";
import { PulseLoader } from "react-spinners";

class OrderConfirmation extends React.Component {
  state = {
    orderPlaced: false,
    itemsPurchased: undefined,
    purchasedOrderData: undefined,
    submitLoading: false
  };

  generateOrderNumber = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  handleSubmitOrder = () => {
    this.setState({ submitLoading: true }, () => {
      setTimeout(() => {
        this.setState(
          {
            orderPlaced: true,
            itemsPurchased: [...this.props.cart],
            orderData: this.props.orderData,
            submitLoading: false
          },
          () => {
            this.props.clearCart();
            this.props.history.replace("/checkout/order-confirmation");
          }
        );
      }, 1000);
    });
  };

  render() {
    let { orderData, customerInfo, removeItem, updateQuantity, cart } = this.props;
    const { orderPlaced, submitLoading, itemsPurchased, purchasedOrderData } = this.state;

    if (!cart.length && !orderPlaced) {
      return <Redirect to="/cart" />;
    }
    if (!customerInfo) {
      return <Redirect to="/checkout/account-info" />;
    }
    if (orderPlaced) {
      cart = itemsPurchased;
      orderData = purchasedOrderData;
    }

    return (
      <Grid>
        <Container>
          <Header>
            <div>
              <h1 className="title">{orderPlaced ? "Thank you for your order" : "Review and Place Your Order"}</h1>
              {orderPlaced && (
                <span id="order-submitted-msg">
                  Your order has been received<br />Order number: <strong>#{this.generateOrderNumber()}</strong>
                </span>
              )}
            </div>
            {!orderPlaced && (
              <Button onClick={this.handleSubmitOrder} large color="primary" width="30rem">
                {submitLoading ? <PulseLoader margin="9px" size={12} color="#fff" /> : "Place Order"}
              </Button>
            )}
          </Header>
          <CustomerInfo_Container>
            <CustomerInfoText title="Account Info" info={customerInfo.main} />
            <CustomerInfoText title="Billing Address" isAddress info={customerInfo.billing} />
            <CustomerInfoText title="Shipping Address" isAddress info={customerInfo.shipping} />
            {!orderPlaced && (
              <Link id="edit-link" to="/checkout/account-info">
                Edit
              </Link>
            )}
          </CustomerInfo_Container>
          <ShoppingCart
            subComponent
            cart={cart}
            orderData={orderData}
            removeItem={removeItem}
            userOptions={!orderPlaced}
            updateQuantity={updateQuantity}
          />
        </Container>
      </Grid>
    );
  }
}

export default OrderConfirmation;

const Container = styled.div`
  grid-column: full;
  width: 100%;

  #order-submitted-msg {
    display: inline-block;
    font-size: ${theme.h1_extraSmall};
    margin-top: 1.5rem;
    ${media.phone`margin-top: -1rem;`};
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4rem;
  ${media.phone`
    flex-direction: column;
  `};

  .title {
    font-size: ${theme.h1_medium};
    ${media.phone`
      font-size: ${theme.h1_small};
      margin-bottom: 4rem;
    `};
  }

  button {
    margin-left: 2rem;
    margin-right: 0;
    height: 5.4rem;
    ${media.phone`
      width: 75%;
      margin: 0 auto;
    `};
    div {
      /*spinner */
      margin-top: 0.3rem;
    }
  }
`;
const CustomerInfo_Container = styled.div`
  border-top: 6px solid ${theme.primary};
  display: grid;
  grid-template-columns: repeat(3, 1fr) max-content;
  grid-gap: 2rem;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
  padding: 2.5rem 3rem;
  margin-bottom: 3rem;
  position: relative;
  ${media.phone`
    grid-template-columns: 1fr;
  `};
  #edit-link {
    font-size: 2rem;
    color: ${theme.link_blue};
    margin-bottom: auto;
    transition: all 0.2s;
    ${media.phone`
      grid-row: 1/2;
      margin-left: auto;
      margin-right: 2rem;
      position: absolute;
      top: 0;
      right: 0;
      padding: 1rem;
    `};

    &:hover {
      color: ${theme.link_blue.lighten(0.3)};
    }
  }
`;

const CustomerInfoText = props => {
  const { title, isAddress, info } = props;
  const { firstName, lastName, email, street, city, state, zipcode } = info;

  return (
    <Styled>
      <h2 className="title">{title}</h2>
      <ul>
        {firstName &&
          lastName && (
            <li className="name">
              {firstName} {lastName}
            </li>
          )}
        {email && <li>{email}</li>}
        {isAddress && (
          <React.Fragment>
            <li>{street}</li>
            <li>
              {city}, {state}
            </li>
            <li>{zipcode}</li>
          </React.Fragment>
        )}
      </ul>
    </Styled>
  );
};

const Styled = styled.div`
  font-size: 1.6rem;
  .title {
    font-size: 2.2rem;
    margin-bottom: 1.4rem;
    color: ${theme.black};
  }
  .name {
    font-weight: 600;
  }
  & > * {
    list-style: none;
  }
`;
