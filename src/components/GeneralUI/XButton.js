import React from "react";
import styled from "styled-components";

const XButton = props => {
  const { setRef, onClick } = props;
  return (
    <Button
      innerRef={setRef}
      onClick={onClick}
    >
    ✖
    </Button>

  );
};

const Button = styled.button`
  border: none;
  background: none;
  color: black;
  cursor: pointer;
  font-size: 1.4rem;
  padding-left: 1rem;

  position: absolute;
  top: 0;
  right: 0;
  &:hover {
    transition: all 0.2s;
    color: rgba(0, 0, 0, 0.5);
  }
  &:focus {
    outline: 0;
  }
`;

export default XButton;
