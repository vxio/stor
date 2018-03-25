import React from "react";
import { NavLink } from "react-router-dom";
import theme, { media } from "../theme";
import styled from "styled-components";

const activeClassName = "nav-item-active";

const StyledLink = styled(NavLink).attrs({
  activeClassName
})`
  /* background-color: white; */
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
  font-size: 2rem;
  text-transform: capitalize;
  justify-content: center;
  padding: 1.8rem 3rem 0.8rem 0;
  display: flex;
  border-bottom: 1px solid transparent;
  & > * {
    margin: 0 4rem;

    ${media.phoneSmall`
  margin: 0 3rem;
  `};
  }
  z-index: 100;
  box-shadow: 0 1px 4px rgba(76, 76, 75, 0.15);

  ${media.phone`
  font-size: 2.3rem;
  padding-right: 4rem;
  `};
`;

export default NavItems;
