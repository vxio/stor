import React, { Fragment } from "react";
import { Elements, CardElement } from "react-stripe-elements";

import { render } from "react-dom";
import { Form, Field } from "react-final-form";
import { FORM_ERROR } from "final-form";
import { checkValidity } from "./Utility";
import styled from "styled-components";
import theme, { Grid } from "../theme";
import OrderSummary from "./OrderSummary";
import { Cart_Checkout_Styled } from "./ShoppingCart";
import ContactForm from "./ContactForm";
import {Redirect} from 'react-router-dom';

class Checkout extends React.Component {
  render() {
    const { onSubmit, orderData, customerInfo, cart } = this.props;
    if(!cart.length) {
      // return <Redirect to="/shop" />
    }

    return (
      <Grid>
          <ContactForm id="contact-form" onSubmit={onSubmit} customerInfo={customerInfo} />
          {/* <OrderSummary id="order-summary" orderData={orderData} /> */}
      </Grid>
    );
  }
}

export default Checkout;
