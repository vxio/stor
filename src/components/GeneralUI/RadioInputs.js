import React from "react";
import styled from "styled-components";
import theme from "../../theme";
import { Field } from "react-final-form";

const RadioInputs = props => {
  const { name, options, customOnChange, error } = props;
  return (
    <InputsStyled error={error}>
      {options.map((option, i) => (
        <Field key={i} name={name} component="input">
          {({ input, meta }) => {
            return (
              <React.Fragment>
                <input
                  {...input}
                  type="radio"
                  onChange={value => {
                    customOnChange(option.value);
                    return input.onChange(value);
                  }}
                  id={i}
                  value={option.value}
                />
                <label htmlFor={i}>{option.displayValue}</label>
                {/* {meta.submitFailed && <span>{meta.error}</span>} */}
              </React.Fragment>
            );
          }}
        </Field>
      ))}
    </InputsStyled>
  );
};

export default RadioInputs;

const InputsStyled = styled.div`
  display: flex;
  margin-top: -5px;
  width: min-content;
  border: ${props => `1px solid ${(props.error && props.theme.danger) || "transparent"}`};
  border-radius: 3px;
  padding: 3px 0;
  transition: all 0.2s;

  input {
    display: none;

    & + label:hover,
    &:checked + label {
      border: 1px solid ${theme.black};
      border-radius: 2px;
      color: ${theme.black};
      transition: all 0.3s ease-out;
    }
  }
  label {
    color: ${theme.grey_6};
    display: inline-block;
    cursor: pointer;
    font-size: 17px;
    font-weight: 600;
    border: 1px solid transparent;
    padding: 5px 8px;
    margin: 0 5px;
    user-select: none;
  }
`;
