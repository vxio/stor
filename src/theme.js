import createTheme from "styled-components-theme";
import React from "react";
import styled from "styled-components";

// const primary = "rgb(12, 122, 192)";

// const theme = {
//   brandBlue: "rgb(12, 122, 192)",
//   brandRed: "rgb(179, 32, 35)",
//   brandYellow: "rgb(244, 167, 0)",
//   brandGrey: "rgb(84, 106, 120)",
//   primary: primary,
//   secondary: "rgb(84, 106, 120)",
//   warning: "rgb(244, 167, 0)",
//   danger: "rgb(179, 32, 35)",
//   fontMono: "'Courier', monospace",
//   fontSans: "'Source Sans Pro', 'Arial', sans-serif",
//   fontSerif: "'Bree Serif', 'Times', serif",
//   baseFontColor: "rgb(84, 106, 120)",
//   baseFontFamily: "'Source Sans Pro', 'Arial', sans-serif",
//   baseFontSize: "16px",
//   fontthin: 300,
//   fontNormal: 400,
//   fontSemibold: 600,
//   fontBold: 700,
//   baseLineHeight: 1.5,
//   baseBorder: "1px solid rgb(84, 106, 120)",
//   baseRadius: "0.25rem",
//   baseBoxShadow: "rgba(42, 53, 60, 0.2) 0 0 5px"
// };

const baseSize = 16;

export const variables = {
  baseFontFamily: "Source Sans Pro" /* Colors */,
  primary: "#44c0b6",
  primary_light: "#6ACDC5",
  primary_dark: "#3db6ac",
  link_blue: "#1DA1F2",
  success: "#05c46b",
  danger: "#F15C5C",
  disabled: "#6a6d74",
  grey_1: "#cacbcf",
  grey_2: "#b0b1b6",
  grey_3: "#9EA0A6",
  grey_4: "#8c8f96",
  grey_5: "#7b7d85",
  grey_6: "#6a6d74",
  grey_7: "#5a5c62",
  white: "#F2F0EA",
  black: "#282c37" /* Fonts */,
  baseFontSize: "1.6rem",
  p_extraSmall: "1.2rem",
  p_small: "1.4rem",
  p_medium: "1.6rem",
  p_large: "1.8rem",
  p_extraLarge: "2rem",
  h1_extraSmall: "2.6rem",
  h1_small: "3rem",
  h1_medium: "3.6rem",
  h1_large: "4rem",
  fontThin: 300,
  fontNormal: 400,
  fontSemibold: 600,
  fontBold: 700,
  baseRadius: "2.5px",
  baseRadius_2: "5px"
};

const theme = createTheme(...Object.keys(variables));

export const Grid = styled.div`
  display: grid;
  grid-template-columns:
    minmax(3rem, 1fr) [full-start] repeat(12, [col-start] minmax(min-content, 10rem) [col-end])
    [full-end] minmax(3rem, 1fr);
  justify-content: center;
`;

export default theme;

// @mixin centerAbsolute {
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
// }
