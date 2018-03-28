import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Icon = props => {
  const styles = {
    svg: {
      display: "inline-block",
      verticalAlign: "middle",
      margin: "auto"
    },
    path: {
      fill: props.color
    }
  };
  const icon = props.icon.format === "data" ? <path d={props.icon.path} /> : props.icon.markup;
  const pixels = convertRemToPixels(props.size/10);

  return (
    <SVG_Styles
      className={props.className}
      style={styles.svg}
      width={`${pixels}px`}
      height={`${pixels}px`}
      viewBox={props.icon.viewBox || "0 0 1024 1024"}
      fill={props.fill}
    >
      {icon}
    </SVG_Styles>
  );
};

Icon.propTypes = {
  icon: PropTypes.object.isRequired,
  size: PropTypes.number,
  color: PropTypes.string
};

Icon.defaultProps = {
  size: 16
};

export default Icon;

const SVG_Styles = styled.svg`
  path {
    fill: ${props => props.fill || "inherit"};
  }
`;

function convertRemToPixels(rem) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}
