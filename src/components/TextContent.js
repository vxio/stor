import React from "react";
import styled from "styled-components";
import theme from '../theme';


const HeaderText = styled.h2`
  /* color: #ccc; */
  font-weight: 400;
  font-family: "Montserrat";
  font-size: 4rem;
  /* margin-bottom: 0.2em; */
  white-space: nowrap;
  /* margin-right: 3.5rem; */
  /* line-height: 1.; */
  margin-bottom: 2rem;
`;

const BodyText = styled.p`
  font-size: 1.6rem;
  width: 40rem;
  line-height: 1.5;
`;
const TextContent = props => {
  return (
    <div className={props.className}>
      <HeaderText>{props.title}</HeaderText>
      <BodyText>{props.children}</BodyText>
    </div>
  );
};

export default TextContent;


