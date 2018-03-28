import React from "react";
import styled from "styled-components";
import theme from "../../theme";

const Checkbox = props => {
  return (
    <Styles>
      <div className="checkbox">
        <label>
          <input type="checkbox" onChange={props.onChange} defaultChecked={props.useSameAddress} />
          <i className="helper" />
          <span className="text">{props.children}</span>
        </label>
      </div>
    </Styles>
  );
};

export default Checkbox;

const Styles = styled.div`
/*checkbox and radio  */
.checkbox,
  label {
    font-size: 1.4rem;
    position: relative;
    cursor: pointer;
    padding-left: 2rem;
    text-align: left;
    color: #333;
    display: block;
    width: max-content;
  }

  input {
    opacity: 0.00000001;
    position: absolute;
    left: 0;
    cursor: pointer;
    margin-left: -1rem;
  }
}

.checkbox {
  margin-top: calc(1rem * 2);
  margin-bottom: 3rem;
  margin-left: 0.5rem;
  position: relative;
  .text {
    display: inline-block;
    margin-left: 0.7rem;
    font-size: 1.6rem;
  }

  .helper {
    color: #999;
    width: 1.6rem;
    height: 1.6rem;
    position: absolute;
    top: calc(1.6rem / 6);
    left: 0;
    z-index: 0;
    border: calc(1.6rem / 8) solid currentColor;
    border-radius: calc(1.6rem / 16);
    transition: border-color 0.1s ease;

    &::before,
    &::after {
      position: absolute;
      height: 0;
      width: calc(1.6rem * 0.2);
      background-color: ${theme.primary};
      display: block;
      transform-origin: left top;
      border-radius: calc(1.6rem / 4);
      content: "";
      transition: opacity 0.1s ease, height 0s linear 0.1s;
      opacity: 0;
    }

    &::before {
      top: calc(1.6rem * 0.65);
      left: calc(1.6rem * 0.38);
      transform: rotate(-135deg);
      box-shadow: 0 0 0 calc(1.6rem / 16) #fff;
    }

    &::after {
      top: calc(1.6rem * 0.3);
      left: 0;
      transform: rotate(-45deg);
    }
  }

  label:hover .helper {
    color: ${theme.primary};
  }

  input:checked {
    ~ .helper {
      color: ${theme.primary};

      &::after,
      &::before {
        opacity: 1;
        transition: height 0.1s ease;
      }

      &::after {
        height: calc(1.6rem / 2);
      }

      &::before {
        height: calc(1.6rem * 1.2);
        transition-delay: 0.1s;
      }
    }
  }
}
`;
