import React from "react";
import { NavLink } from "react-router-dom";
import styled from 'styled-components';


const activeClassName = "nav-item-active";

const StyledLink = styled(NavLink).attrs({
  activeClassName
})`
  background-color: white;

  &.${activeClassName} {
    background-color: red;
    color: white;
  }
`;


// const NavItem = props => (
//   <li>
//     <StyledLink to={props.link} exact={props.exact}>
//       {props.children}
//     </StyledLink>
//   </li>
// );

const NavItems = props => (
  <ul>
    <StyledLink to="/" exact>
      Home
    </StyledLink>
    <StyledLink to="/cart">Cart</StyledLink>
    <StyledLink to="/checkout">Checkout</StyledLink>
  </ul>
);

export default NavItems;


