import React, { Fragment } from "react";
import { Elements, CardElement } from "react-stripe-elements";

import { render } from "react-dom";
import { Form, Field } from "react-final-form";
import { FORM_ERROR } from "final-form";
import { checkValidity } from "./Utility";
import styled from "styled-components";
import theme, {Grid} from "../theme";
import OrderSummary from "./OrderSummary";
import { Cart_Checkout_Styled } from "./ShoppingCart";
import ContactForm from "./ContactForm";

class Checkout extends React.Component {
  orderData = this.props.getOrderData();

  handleOnSubmit = async values => {
    // await sleep(300);
    // window.alert(JSON.stringify(values, 0, 2));
    console.log(values);
    this.props.history.push("/checkout/order-summary", {
      submittedInfo: values,
      cart: this.props.cart,
      sameAddress: this.state.sameAddress,
      orderData: this.orderData
    });
    this.props.clearCart();
  };

  render() {
    return (
      <Grid>
      <Cart_Checkout_Styled>
        <ContactForm id="contact-form" onSubmit={this.handleOnSubmit} />
        <OrderSummary id="order-summary" orderData={this.props.orderData} />
      </Cart_Checkout_Styled>
</Grid>
    );
  }
}

export default Checkout;


