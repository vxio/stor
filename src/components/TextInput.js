import React, { Fragment } from "react";
import { Field } from "react-final-form";
import styled from "styled-components";
import theme from "../theme";
import * as validator from "./validators";

export const TextInput = ({
  name,
  label,
  purpose,
  isEmail,
  validate,
  disabled,
  charLimit,
  errorCheckOnInput,
  customErrorMsg,
  id,
  autoFocus,
  onFocus,
  ...props
}) => {
  return (
    <Field name={`${purpose}.${name}`} component="input" placeholder={`${label}`} validate={validate}>
      {({ input, meta }) => {
        if (typeof errorCheckOnInput === "function") {
          errorCheckOnInput = errorCheckOnInput(input.value);
        }
        const invalidInput = meta.error && (meta.touched || (input.value && errorCheckOnInput && meta.dirty));
        return (
          <FormGroup hasValue={input.value} invalidInput={invalidInput} className="form-group">
            <input
              style={(invalidInput && { borderColor: "#F15C5C" }) || {}}
              {...input}
              disabled={disabled}
              type="text"
              maxLength={charLimit}
              id={id}
              autoFocus={autoFocus}
              onFocus={onFocus}
            />
            {/*  placeholder={`${label}`} */}
            <label className="control-label">{label}</label>
            <i className="bar" />
            {
              <span className="error-msg">
                {(invalidInput && ((meta.error && customErrorMsg) || meta.error)) || <br />}
              </span>
            }
          </FormGroup>
        );
      }}
    </Field>
  );
};

const FormGroup = styled.div`
position: relative;
margin: 2rem 1rem;
  .error-msg {
    line-height: 1.7;
    font-size: ${theme.p_small};
    color: ${theme.danger};
  }

  .control-label {
    position: absolute;
    top: calc(1.6rem / 4);
    pointer-events: none;
    padding-left: 0.2rem;
    z-index: 1;
    color: ${theme.grey_5};
    font-size: 1.8rem;
    font-weight: normal;
    transition: all 0.3s ease;
  }

  input {
    display: block;
    background: none;
    padding: 0.2rem 0.2rem calc(0.2rem / 2);
    font-size: 1.8rem;
    border-width: 0;
    border-color: transparent;
    line-height: 1.9;
    width: 100%;
    color: transparent;
    transition: all 0.3s ease;
    box-shadow: none;
    box-shadow: inset 0px 0px 0px 0px white;
    -webkit-box-shadow: 0 0 0px 1000px white inset;
    border-bottom: 1px solid ${theme.grey_5};
  }

  ${props => `select, input:focus, ${!!props.hasValue && "input"}`} {
    color: ${theme.black};

    ~ .control-label {
      font-size: 1.4rem;
      color: ${props => (props.invalidInput && theme.danger) || theme.primary};
      top: -1.2rem;
      left: 0;
    }
  }

  select,
  input,
  textarea {
    &:focus {
      outline: none;
      border-color: ${theme.primary};
    }
  }
`;

export const AddressInputs = ({ purpose }) => {
  const { required, onlyLetters, checkDigits, onlyNumbers, composeValidators } = validator;
  return (
    <Fragment>
      <TextInput name="street" label="Street" charLimit="70" purpose={purpose} validate={required} />
      <TextInput
        name="city"
        label="City"
        charLimit="45"
        errorCheckOnInput
        purpose={purpose}
        validate={composeValidators(onlyLetters, required)}
      />
      <TextInput
        name="state"
        label="State"
        charLimit="50"
        errorCheckOnInput
        purpose={purpose}
        validate={composeValidators(onlyLetters, required)}
      />
      <TextInput
        name="zipcode"
        label="Zipcode"
        charLimit="5"
        purpose={purpose}
        errorCheckOnInput={onlyNumbers}
        customErrorMsg="Enter a 5 digit ZIP code"
        validate={checkDigits(5)}
      />
    </Fragment>
  );
};
