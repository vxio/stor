import styled from "styled-components";
import React from "react";

const Styledbutton = styled.button`
  color: ${props => props.theme.primary};
  font-weight: 700;
  font-size: 30px;
`;

const button = props => <Styledbutton>{props.children}</Styledbutton>;

export default button;
