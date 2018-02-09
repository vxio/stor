import React from "react";
import styled from "styled-components";
import theme from "../theme";
const Warning = styled.p`
  color: ${props => (!props.warn && theme.grey_5) || `#f15c5c !important`};
  font-size: 1.6rem;
  text-transform: ${props => props.showUserInput && `capitalize`};
`;

const WarningText = props => {
  const { warn, showUserInput, defaultText, children } = props;
  const text = (!warn && !showUserInput && defaultText) || showUserInput || children;
  return <Warning className={props.className}{...props}>{text}</Warning>;
};

export default WarningText;
