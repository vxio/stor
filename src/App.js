import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import StoreContainer from "containers/StoreContainer/StoreContainer";
import styled from "styled-components";
import { StripeProvider } from "react-stripe-elements";

class App extends Component {
  componentWillMount() {
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/";
    script.async = true;

    document.body.appendChild(script);
  }

  render() {
    return (
      <div style={{ height: "4000px" }}>
        {/* <Switch>
          <Route path="/" exact component={StoreContainer} />
     
        </Switch> */}
        <StripeProvider apiKey="pk_test_12345">
          <StoreContainer />
        </StripeProvider>
      </div>
    );
  }
}

export default withRouter(App);
// export default App;
