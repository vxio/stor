import createTheme from "styled-components-theme";
import styled, { css } from "styled-components";
import { injectGlobal } from "styled-components";

export const variables = {
  appTitle: 'Stor',
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
  boxShadow_border: "0 0px 4px rgba(0,0,0,.2), 0 2px 4px rgba(0,0,0,.15)",
  boxShadow_1: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
  boxShadow_1_hover: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
  boxShadow_2: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
  transition_hover: "all 0.3s cubic-bezier(.25,.8,.25,1)",
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

/*** MEDIA QUERIES ***/
export const windowSizes = {
  desktop: 1800,
  laptop: 1200,
  tabletLarge: 1024,
  tabletSmall: 900,
  tabletExtraSmall: 750,
  phone: 600,
  phoneSmall: 375
};

// iterate through the sizes and create a media template
export const media = Object.keys(windowSizes).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSize = windowSizes[label] / 16;
  if (label === "desktop") {
    accumulator[label] = (...args) => css`
      @media only screen and (min-width: ${emSize}em) {
        ${css(...args)};
      }
    `;
  } else {
    accumulator[label] = (...args) => css`
      @media only screen and (max-width: ${emSize}em) {
        ${css(...args)};
      }
    `;
  }
  return accumulator;
}, {});

injectGlobal`
  html {
    /* height: 100%; */
    overflow-x:hidden;
    font-size: 62.5%;
    ${media.desktop`font-size: 75%;`}
    ${media.laptop`font-size: 56.25%;`}
    ${media.phone`font-size: 50%;`}
  }

   body {
position: relative;
 height: fit-content;
  }
  /* html, body {
    height:100%;
    padding:0;
    margin: 0;
  } */

  color: ${variables.black};


  a {
    text-decoration: none;

    &:hover {
      color: ${variables.primary};
    }
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns:
    minmax(3rem, 1fr) [full-start] repeat(12, [col-start] minmax(min-content, 11rem) [col-end])
    [full-end] minmax(3rem, 1fr);
  justify-content: center;
  margin-top: 5rem;
  ${media.phone`margin-top: 3rem;`};
`;

const theme = createTheme(...Object.keys(variables));
export default theme;

// @mixin centerAbsolute {
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
// }
