import React from "react";
import styled from "styled-components";

const Warning = styled.p`
  color: red;
`;

const WarningText = props => {
  return <Warning>{props.children}</Warning>;
};

export default WarningText;
