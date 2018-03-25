import styled from "styled-components";
import theme, { media } from "../../theme";

//component globals
let baseFontSize;
let color;
let darkColor;
const Button = styled.button`
  ${props => {
    const fontSize = theme.baseFontSize;
    baseFontSize = parseInt(fontSize, 10);
    //set color
    color = (props.success && "success") || props.color || props.danger || (props.inverted && "#fff") || "primary"; //default;
    if (color === "black") {
      darkColor = true;
    } else darkColor = false;
  }}
  display: inline-block;

  border: ${props => (props.inverted ? `1px solid ${props.theme.primary}` : "none")};
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  border-radius: ${theme.baseRadius};
  font-size: ${props => {
    const { baseFontSize } = props.theme;
    const baseFontSizeParsed = parseInt(baseFontSize, 10);
    return (
      (props.small && theme.p_small) ||
      (props.large && theme.p_large) ||
      (props.extraLarge && theme.p_extraLarge) ||
      baseFontSize
    );
  }};
  background-color: ${props => theme[color]};

  padding: .78em 1.5em;
  width: ${props => props.width || "100%"};
  ${media.phone`width: 100%;
   font-size: 16px;
  `};
  /* letter-spacing: .5px; */
  font-family: inherit;
  margin: 0 auto;


  font-weight: ${props => props.theme.fontSemibold};
  /* line-height: ${props => (props.small && "2.2") || (props.large && "1.25") || "2.5"}; */
  line-height: 1.5em;
  position: relative;
  text-align: center;
  color: ${props => (props.inverted && props.theme.primary) || (props.link && props.theme.baseFontColor) || "#fff"};
  transition: color .1s;

  &:hover {
background-color: ${props => !props.disabled && ((darkColor && theme[color].lighten(0.5)) || theme[color].darken(0.1))};
}

&:active {
  background-color: ${props =>
    !props.disabled && ((darkColor && theme[color].lighten(0.8)) || theme[color].darken(0.2))};
}

&:focus {
  outline: 0;
  border: none;
  box-shadow: none;
}
&::-moz-focus-inner {
  border: 0;
}

`;

Button.displayName = "Button";
export default Button;
