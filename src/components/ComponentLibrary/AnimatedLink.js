import React from "react";
import styled from "styled-components";
import theme from "../theme";
import { NavLink } from "react-router-dom";

const AnimatedLink = props => {
  return (
    <StyledLink to="l">
      <div className="line-animation back"></div>
      <div className="link-text">Sample</div>
      <div className="line-animation front"></div>
    </StyledLink>
  );
};

export default AnimatedLink;

const activeClassName = "nav-item-active";
const StyledLink = styled(NavLink).attrs({
  activeClassName
})`
  font-size: 2rem;
  margin-bottom: 1.6rem;
  width: 100%;
  display: block;
  display: flex;

  .link-text {
      margin-left: .5rem;
      margin-right: 1rem;
      color: black;
  }

  .line-animation {
    position: relative;
    &:before,
    &:after {
      content: "";
      position: absolute;
      width: 0%;
      height: .8px;
      top: 50%;
      margin-top: -.5px;
      background: ${theme.black};
      z-index: -1;
    }

      &:before {
        left: -2.5px;
      }
      &:after {
        right: 2.5px;
            background: ${theme.black};
        transition: width 0.5s cubic-bezier(0.22, 0.61, 0.36, 1);
      }

    }
  
  .back {
    width: 3rem;
  }

  .front {
    width: 100%;
  }

  &.${activeClassName}, &:hover,
  &:active {
    .line-animation:before {
        background: ${theme.black};
      width: 100%;
      transition: width .5s cubic-bezier(0.22, 0.61, 0.36, 1);
    }

    .line-animation:after {
      background: transparent;
      width: 100%;
      transition: 0s;
  }
`;

const StyledSubLink = StyledLink.extend`
  color: orangered;
  padding-left: 2rem;

  margin-bottom: 1rem;
  font-size: 1.6rem;
  white-space: no-wrap;
`;
