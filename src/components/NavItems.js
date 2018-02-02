import React from "react";
import { NavLink } from "react-router-dom";
import theme from "../theme";
import styled from "styled-components";

const activeClassName = "nav-item-active";

const StyledLink = styled(NavLink).attrs({
  activeClassName
})`
  background-color: white;
  text-align: center;
  font-size: 2rem;

  display: flex;
  align-items: flex-end;



  // &.${activeClassName},
   &:hover,
  &:active {
    color: ${theme.primary}!important;
  }
`;

export const NavItem = props => (
  <StyledLink {...props} exact>
    {props.children}
  </StyledLink>
);

export const NavItems = props => <StyledNavItems>{props.children}</StyledNavItems>;

const StyledNavItems = styled.div`
  grid-column: center;
  display: grid;
  grid-template-columns: repeat(3, minmax(10rem, max-content));
  grid-column-gap: 5rem;
  justify-content: space-between;
  align-items: center;
  /* margin: 0 auto; */

  & .icon {
    /* color: black; */
    font-size: 3rem;
    margin-right: 1rem;
    margin-left: 3rem;
  }
`;

export default NavItems;
