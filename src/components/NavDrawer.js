import React from "react";
import { media } from "../theme";
import styled from "styled-components";
import Drawer from "react-motion-drawer";
import * as Icon from "react-feather";

const style = {
  background: "#fff",
  boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
};

const drawerProps = {
  drawerStyle: style,
  width: 250,
  overlayColor: "rgba(0,0,0,.2)",
  right: true
};

class NavDrawer extends React.Component {
  state = {
    openDrawer: false
  };
  render() {
    const { openDrawer } = this.state;

    return (
      <React.Fragment>
        <DrawerIcon
          style={{ fontSize: "40px", cursor: "pointer" }}
          onClick={() =>
            this.setState({
              openDrawer: !openDrawer
            })
          }
        >
          <Icon.Menu size={30} />
        </DrawerIcon>
        <Drawer {...drawerProps} open={openDrawer} onChange={open => this.setState({ openDrawer: open })}>
          <StyledDrawer>{this.props.children}</StyledDrawer>
        </Drawer>
      </React.Fragment>
    );
  }
}

export default NavDrawer;

const DrawerIcon = styled.div`
  cursor: pointer;
  margin-left: auto;
  margin-right: 1rem;
  padding: 0.3rem 1rem;
  display: none;
  ${media.phone`
    display: inline-block;
  `};
`;

const StyledDrawer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8rem 3rem 0 4rem;
`;
