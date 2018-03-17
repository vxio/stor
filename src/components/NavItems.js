import React from "react";
import { NavLink } from "react-router-dom";
import theme from "../theme";
import styled from "styled-components";

const activeClassName = "nav-item-active";

const StyledLink = styled(NavLink).attrs({
  activeClassName
})`
  background-color: white;
  font-size: 1.75rem;
  color: ${theme.black};

  transition: all .2s ease;


  // &.${activeClassName},
   &:hover,
  &:active {
    color: ${theme.primary}!important;
    // border-bottom: 2px solid ${theme.primary};
  }
`;

export const NavItem = props => (
  <StyledLink {...props} exact>
    {props.children}
  </StyledLink>
);

export const NavItems = props => <StyledNavItems>{props.children}</StyledNavItems>;

const StyledNavItems = styled.div`
  grid-column: 1 / -1;
  text-transform: capitalize;
  /* margin-top: 1rem; */
  /* margin: 1.8rem auto 4rem; */
  /* margin-bottom: 6rem; */
  width: 100%;
  justify-content: center;
  padding: 1.8rem 0 .8rem;
  display: flex;
  margin-bottom: 5rem; //adjusted margin on homepage 
  & > * {
    margin-right: 8rem;
  }
  z-index: 100;

  /* border-bottom: .5px solid${theme.grey_light_2}; */
  /* box-shadow: 0px .5px 2px rggrey_light_2ba(0,0,0, .2); */
  box-shadow: 0 1px 4px rgba(76,76,75,.15);
  /* justify-content: space-between; */

`;

export default NavItems;
