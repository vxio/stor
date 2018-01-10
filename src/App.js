import React, { Component } from "react";
import Button from "components/button/button";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import StoreContainer from "containers/StoreContainer/StoreContainer";
import styled from "styled-components";

class App extends Component {
  render() {
    return (
      <div style={{ height: "4000px" }}>
        {/* <Button primary>click this shit</Button> */}
        {/* <Switch>
          <Route path="/" exact component={StoreContainer} />
     
        </Switch> */}
        <StoreContainer />
      </div>
    );
  }
}

export default withRouter(App);
// export default App;
