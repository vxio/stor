import React from "react";
import styled from "styled-components";
import theme, { media } from "../theme";

const baseTransitionTime = 1.6;
const baseDelay = baseTransitionTime / 2.5;

const Styles = styled.div`
  & > * {
    opacity: 0;
    animation: ${props => props.animation && `fadeInFromLeft ${baseTransitionTime}s ease`};
    animation-fill-mode: forwards;
    /* animation: slideIn 1.6s ease; */
  }

  .header {
    animation-delay: ${props => props.animation && `${props.animation.delay}s`};
  }

  .body {
    animation-delay: ${props => (props.animation.delay && `${baseDelay + props.animation.delay}s`) || `${baseDelay}s`};
  }

  @keyframes fadeInFromLeft {
    0% {
      transform: translate(-3rem, 0);
      opacity: 0;
    }

    100% {
      transform: translate(0, 0);
      opacity: 1;
    }
  }
`;
const HeaderText = styled.h1`
  font-weight: 400;
  font-family: "Montserrat";
  font-size: 4rem;
  white-space: nowrap;
  margin-bottom: 2rem;

  ${media.phoneSmall`font-size:3.5rem;`};
`;

const BodyText = styled.p`
  font-size: 1.6rem;
  line-height: 1.5;
`;

class TextContent extends React.Component {
  render() {
    // const { delay } = animation;
    return (
      <Styles
        animation={this.props.animation}
        innerRef={divElement => (this.divElement = divElement)}
        className={this.props.className}
      >
        <HeaderText className="header">{this.props.title}</HeaderText>
        <BodyText className="body">{this.props.children}</BodyText>
      </Styles>
    );
  }
}

export default TextContent;
