import React from "react";
import styled from "styled-components";
import theme, {media} from "../../theme";

const ContributionFooter = props => {
  return <Styles href={props.link}>Made by Vincent Xiao <span>&#8226;</span> View on GitHub</Styles>;
};

export default ContributionFooter;

const Styles = styled.a`
  color: ${theme.grey_5};
  font-size: 14px;
  width: 100%;
  padding: 1.5em;
  text-align: center;
  background-color: white;
  z-index: 100;
  /* parent container should have min-height: 100vh and padding-bottom: ~6rem */
  position: absolute;
  bottom: 0;
  transition: all .2s;

  span {
      margin: 0 .5em;
  }
`;
