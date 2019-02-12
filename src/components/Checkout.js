import React from "react";
// import styled from "styled-components";
import { Grid } from "../theme";
import ContactForm from "./ContactForm";
import {Redirect} from 'react-router-dom';

class Checkout extends React.Component {
  render() {
    const { onSubmit, customerInfo, isCartEmpty } = this.props;
    if(isCartEmpty) {
      return <Redirect to="/shop" />
    }

    return (
      <Grid>
          <ContactForm id="contact-form" onSubmit={onSubmit} customerInfo={customerInfo} />
      </Grid>
    );
  }
}

export default Checkout;
