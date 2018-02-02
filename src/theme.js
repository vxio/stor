import createTheme from "styled-components-theme";

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

export const variables = {
  baseFontFamily: "Source Sans Pro",
  /* Colors */
  primary: "#55c57a",
  primary_light: "#7ed56f",
  primary_dark: "#28b485",
  grey_dark_1: "#999",
  grey_dark_2: "#666",
  grey_dark_3: "#333",
  white: "#fff",
  black: "#000",
  black_custom: "#282c37", //   secondary: #ffb900;
  //   secondary_light: #ffb900;
  // secondary_dark: #ff7730;

  /* Fonts */
  baseFontSize: "1.6rem",
  fontThin: 300,
  fontNormal: 400,
  fontSemibold: 600,
  fontBold: 700
};

const theme = createTheme(...Object.keys(variables));

export default theme;

// @mixin centerAbsolute {
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
// }
