import React from "react";
import styled from "styled-components";
import theme from "../theme";
const Warning = styled.p`
  color: ${props => (props.success && theme.primary) || (!props.warn && theme.grey_5) || `#f15c5c !important`};
  /* fill: ${props => (props.success && theme.primary) || (!props.warn && theme.grey_5) || `#f15c5c !important`}; */
  font-size: 1.6rem;
  text-transform: ${props => props.showUserInput && `capitalize`};
  white-space: pre-line;
  transition: all .9s;
`;

const WarningText = props => {
  const { success, warn, showUserInput, defaultText, children } = props;
  //default text - showUserInput (same styling as defaultText but content of user input) - children
  const text = (!warn && !showUserInput && defaultText) || children;
  return <Warning className={props.className}{...props}>{text}</Warning>;
};

export default WarningText;
