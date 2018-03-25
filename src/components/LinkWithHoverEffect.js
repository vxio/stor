import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Icon from "./Icon";
import { ICONS } from "./constants";
import theme from '../theme';

const LinkWithHoverEffect = props => {
  //default values
  let {size, to, className, id} = props;
  // !size && size = 20;

  return (
    <Link_Styled to={to} size={size} className={className} id={id}>
      <Icon fill="currentColor" size={size} icon={ICONS.CHEVRON_RIGHT} />
      <span>{props.children}</span>
    </Link_Styled>
  );
};


LinkWithHoverEffect.defaultProps = {
  size: 15 
};


export default LinkWithHoverEffect

const Link_Styled = styled(NavLink)`
  color: ${theme.grey_6};
  font-size: ${props => `${(props.size / 6.1).toFixed(2)}rem`};
  display: inline-block;
  animation: slideIn 1s ease;


  &:hover {

    svg {
      transform: translateX(-0.3em);
      fill: ${theme.primary};
    }
    span {
      transform: translateX(0.2em);
    }
  }

  svg {
    transition: all 0.4s cubic-bezier(0.22, 0.61, 0.36, 1);
    vertical-align: baseline !important;
  }
  span {
    transition: all 0.4s cubic-bezier(0.22, 0.61, 0.36, 1);
    margin-left: 0.8rem;
    display: inline-block;
  }


  @keyframes slideIn {
    0% {
      transform: translateY(3.5rem);
      opacity: 0;
    }

    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
