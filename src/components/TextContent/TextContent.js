import React from "react";
import styled from "styled-components";

const TextContainer = styled.div`
  padding: 100px 0;
  /* max-width: 640px; */
  margin: 0 auto;
  text-align: center;
`;

const HeaderText = styled.h2`
  color: #ccc;
  font-weight: 300;
  font-size: 5rem;
  margin-bottom: 0.2em;
`;

const BodyText = styled.p`
  font-size: 1.6rem;
  margin: 2em;
`;
const TextContent = props => {
  return (
    <TextContainer>
      <HeaderText>{props.title}</HeaderText>
      <hr />
      <BodyText>{props.children}</BodyText>
      <hr />
    </TextContainer>
  );
};

export default TextContent;
