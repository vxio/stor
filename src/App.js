import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import Store from "./components/Store";
// import { StripeProvider } from "react-stripe-elements";

class App extends Component {
  render() {
    return (
      <Container>
        <Store />
      </Container>
    );
  }
}

export default withRouter(App);

const Container = styled.div`
  height: 4000px;
  display: grid;
  grid-template-rows: [nav_start] 5rem [nav_end] 80vh min-content 40vw repeat(3, min-content);
  grid-template-columns:
    [full_start] 1fr [center_start] repeat(8, [col_start] minmax(min-content, 14rem) [col_end])
    [center_end] 1fr [full_end];

  & > * {
    padding: 40px;
    /* font-size: 3rem; */
  }
`;
