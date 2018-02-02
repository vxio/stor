import React from "react";
import styled from "styled-components";
import theme from '../theme';

const TextContainer = styled.div`
  padding: 100px 0;
  /* max-width: 640px; */
  /* margin: 0 auto; */
  /* text-align: center; */


  grid-column: 2 /4; 
  display: flex;
`;

const HeaderText = styled.h2`
  /* color: #ccc; */
  font-weight: 400;
  font-family: "Montserrat";
  font-size: 4rem;
  /* margin-bottom: 0.2em; */
  white-space: nowrap;
  margin-right: 3.5rem;
  line-height: 1;
`;

const BodyText = styled.p`
  font-size: 1.6rem;
  width: 40rem;
  /* text-align: justify; */
  /* margin: 2em; */
`;
const TextContent = props => {
  return (
    <TextContainer>
      <HeaderText>{props.title}</HeaderText>
      {/* <hr /> */}
      <BodyText>{props.children}</BodyText>
      {/* <hr /> */}
    </TextContainer>
  );
};

export default TextContent;


