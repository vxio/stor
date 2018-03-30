import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
// import theme from "./theme";
import Store from "./components/Store";
import axios from 'axios';

class App extends Component {
  render() {
 
    return (
      <UtilityContainer>
        <Store />
      </UtilityContainer>
    );
  }
}

export default withRouter(App);
const UtilityContainer = styled.div`
  /* margin-bottom:4rem; */

  .u-center-text {
    text-align: center !important;
  }

  .u-margin-bottom-small {
    margin-bottom: 1.5rem !important;
  }
  .u-margin-bottom-medium {
    margin-bottom: 4rem !important;
    @include respond(tab-port) {
      margin-bottom: 3rem !important;
    }
  }
  .u-margin-bottom-big {
    margin-bottom: 8rem !important;
    @include respond(tab-port) {
      margin-bottom: 5rem !important;
    }
  }

  .u-margin-top-big {
    margin-top: 8rem !important;
  }
  .u-margin-top-huge {
    margin-top: 10rem !important;
  }
`;
