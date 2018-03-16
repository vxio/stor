import React from "react";
import styled from "styled-components";
import OrderSummary from "./OrderSummary";
import { Link, Redirect } from "react-router-dom";

import theme, { Grid } from "../theme";
import ShoppingCart from "./ShoppingCart";
import Button from "./GeneralUI/Button";
import { PulseLoader } from "react-spinners";

class OrderConfirmation extends React.Component {
  state = {
    orderPlaced: false,
    itemsPurchased: null,
    orderData: null,
    submitLoading: false
  };

  // componentWillUnmount() {
  //   this.state.orderPlaced && this.props.clearCart();
  // }
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
            this.props.history.replace('/checkout/order-confirmation')

          }
        );
      }, 1000);
    });
  };

  render() {
    let { orderData, customerInfo, removeItem, updateQuantity, cart } = this.props;
    const { orderPlaced, submitLoading } = this.state;
    if(!cart.length && !orderPlaced) {
      return <Redirect to="/cart" />
    }
    else if(!customerInfo) {
      return <Redirect to="/checkout/account-info" />
    }
    if (orderPlaced) {
      cart = this.state.itemsPurchased;
      orderData = this.state.orderData;
    }

    const orderNumber = this.generateOrderNumber();

    return (
      <Grid>
        <Container>
          <Header>
            <div>
              <h1 className="title">{orderPlaced ? "Thank you for your order" : "Review and Place Your Order"}</h1>
              {orderPlaced && <span id="order-submitted-msg">Your order has been received<br/>Order number: <strong>#{orderNumber}</strong></span>}
            </div>
            {!orderPlaced && <Button onClick={this.handleSubmitOrder} large color="primary" width="30rem">
              {submitLoading ? <PulseLoader margin="9px" size={12} color="#fff" /> : "Place Order"}
            </Button>}
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
    /* margin: 1rem 0 3rem; */
    margin-top: 1.5rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4rem;
  .title {
    font-size: ${theme.h1_large};
  }

  button {
    /* margin-left: auto; */
    margin-right: 0;
    height: 5.4rem;
    div {
      /*spinner */
      margin-top: 0.3rem;
    }
  }
`;
const CustomerInfo_Container = styled.div`
  grid-column: 1/3;

  border-top: 6px solid ${theme.primary};
  display: grid;
  grid-template-columns: repeat(3, 1fr) max-content;
  grid-gap: 2rem;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
  padding: 2.5rem 3rem;
  margin-bottom: 3rem;
  #edit-link {
    font-size: 2rem;
    color: ${theme.link_blue};
    margin-bottom: auto;
    transition: all 0.2s;
    &:hover {
      color: ${theme.link_blue.lighten(0.3)};
    }
    /* height: max-content; */
    /* color: #9bc4df; */
    /* margin-left: auto; */
  }
  /* justify-content: space-between; */
  /* & > *:not(:last-child) {
      margin-right: 4rem;
    } */
`;

const CustomerInfoText = props => {
  const { title, isAddress, info } = props;
  // let output;
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

  /* margin-left: 2rem; */
  .title {
    font-size: 2.2rem;
    margin-bottom: 1.4rem;
    color: ${theme.black};
  }
  .name {
    font-weight: 600;
    /* font-size: 1.8rem; */
  }
  & > * {
    list-style: none;
  }
`;
