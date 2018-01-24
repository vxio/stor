import React from "react";
import { NavLink } from "react-router-dom";
import FontAwesome from 'react-fontawesome';
import styled from "styled-components";

const activeClassName = "nav-item-active";

const StyledLink = styled(NavLink).attrs({
  activeClassName
})`
  background-color: white;
  text-align: center;
  text-decoration: none;
  color: black;
  font-size: 2rem;

  display: flex;
  align-items: flex-end;



  // &.${activeClassName},
   &:hover,
  &:active {
    color: teal;
  }
`;

export const NavItem = props => (
  <StyledLink {...props} exact>
    <FontAwesome className={`icon ${props.iconName}`} />
    {props.children}
  </StyledLink>
);

export const NavItems = props => <StyledNavItems>{props.children}</StyledNavItems>;

const StyledNavItems = styled.div`
  /* font-size: 100px; */
  display: grid;
  grid-template-columns: repeat(3, max-content);
  grid-column-gap: 5rem;
  justify-content: center;
  /* justify-items: center; */
  align-items: center;
  margin: 0 auto;

  & .icon {
    /* color: black; */
    font-size: 3rem;
    margin-right: 1rem;
  }

`;

export default NavItems;
