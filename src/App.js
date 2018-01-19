import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import Store from "./components/Store"
import { StripeProvider } from "react-stripe-elements";

class App extends Component {
  render() {
    return (
      <div style={{ height: "4000px" }}>
        <StripeProvider apiKey="pk_test_12345">
          <Store />
        </StripeProvider>
      </div>
    );
  }
}

export default withRouter(App);
