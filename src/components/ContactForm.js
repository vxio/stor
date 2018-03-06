import React, { Fragment } from "react";
import { Elements, CardElement } from "react-stripe-elements";

import { render } from "react-dom";
import { Form, Field } from "react-final-form";
import { FORM_ERROR } from "final-form";
import { checkValidity } from "./Utility";
import styled from "styled-components";
import theme from "../theme";
import OrderSummary from "./OrderSummary";
import { Grid_Styled } from "./ShoppingCart";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const required = value => (value ? undefined : true);
const mustBeNumber = value => (isNaN(value) ? "Must be a number" : undefined);
const checkDigits = digits => value =>
  !isNaN(value) && value.length === digits ? undefined : `Must be ${digits} digits`;
const minValue = min => value => (isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`);
const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);

const TextInput = ({ name, label, purpose, isEmail, validate, disabled, ...props }) => {
  return (
    <div>
      <Field name={`${purpose}.${name}`} component="input" placeholder={`${label}`} validate={validate}>
        {({ input, meta }) => {
          // const validInput = meta.error && meta.touched;
          // console.log("input", input)
          // console.log("meta", meta)
          return (
            <FormGroup hasValue={input.value} className="form-group">
              <input
                style={(meta.error && meta.touched && {}) || {}}
                {...input}
                disabled={
                  disabled // {...input}
                }
                type="text"
              />
              {/*  placeholder={`${label}`} */}
              <label className="control-label">{label}</label>
              <i class="bar" />
              {/* {meta.submitFailed || meta.touched && <span>{meta.error}</span>} */}
            </FormGroup>
          );
        }}
      </Field>
    </div>
  );
};

const FormGroup = styled.div`

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
    margin-bottom: 3rem;
    /* -webkit-box-shadow: 0 0 0px 1000px white inset; */
   /* -webkit-appearance: none; */
   box-shadow: inset 0px 0px 0px 0px white;
    border-bottom: 1px solid ${theme.grey_5};
  }

  ${props => `select, input:focus, ${!!props.hasValue && "input"}`} {
    color: ${theme.black};

    ~ .control-label {
      font-size: 1.4rem;
      color: ${theme.primary};
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
      /* border-bottom: 2px solid ${theme.primary}; */
    }
  }
`;

const AddressInputs = ({ purpose }) => {
  return (
    <Fragment>
      <TextInput name="street" label="Street" purpose={purpose} validate={required} />
      <TextInput name="city" label="City" purpose={purpose} validate={required} />
      <TextInput
        name="zipcode"
        label="Zipcode"
        purpose={purpose}
        validate={composeValidators(checkDigits(5), required)}
      />
    </Fragment>
  );
};

class ContactForm extends React.Component {
  state = {
    sameAddress: false
  };
  render() {
    const { id, onSubmit } = this.props;

    return (
      <Styles id={id}>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, reset, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <div className="header">
                <span>Billing and Shipping Information</span>
              </div>
              <TextInput name="firstName" id="hi" label="First Name" purpose="main" validate={required} />
              <TextInput name="lastName" label="Last Name" purpose="main" validate={required} />
              <TextInput name="email" label="Email" isEmail purpose="main" validate={required} />
              <h2 className="subheader">Billing Address</h2>
              <AddressInputs purpose="billing" />
              <h2 className="subheader">Shipping Address</h2>
              <div className="checkbox">
                <label>
                  <input
                    type="checkbox"
                    onChange={() => {
                      this.setState(prevState => ({ sameAddress: !prevState.sameAddress }));
                    }}
                  />
                  <i className="helper" />
                  <span className="text">I'm the label from a checkbox</span>
                </label>
              </div>

              {this.state.sameAddress ? null : <AddressInputs purpose="shipping" />}
              <div className="buttons">
                <button type="submit" disabled={submitting}>
                  Submit
                </button>
                <button type="button" onClick={reset} disabled={submitting || pristine}>
                  Clear Form
                </button>
              </div>
              <pre>{JSON.stringify(values, 0, 2)}</pre>
            </form>
          )}
        />
      </Styles>
    );
  }
}
export default ContactForm;

const Styles = styled.div`
form {
  width: 38rem;
  /* margin: 10px auto; */
  padding: 2rem 2.5rem;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  .form-radio,
  .form-group {
    position: relative;
    /* margin-top: calc(1.6rem * 3);
    margin-bottom: calc(1.6rem * 3); */
    margin-bottom: 1.6rem;
  }

  .header {
    /* background-color: ${theme.grey_5}; */
    margin-bottom: 3rem;
    span {
      font-size: 2rem;
      font-weight: 600;
      display: inline-block;
      margin: 0 auto;
    }
  }
  .subheader {
    font-size: 1.7rem;
    margin-bottom: 2rem;
  }


  /*checkbox and radio  */
  .checkbox,
  .form-radio {
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
      width: auto;
      opacity: 0.00000001;
      position: absolute;
      left: 0;
    }
  }

  .radio {
    margin-bottom: 1.6rem;

    .helper {
      position: absolute;
      top: calc(1.6rem/4);
      left: calc(1.6rem/4);
      cursor: pointer;
      display: block;
      font-size: 1.6rem;
      user-select: none;
      color: #999;

      &::before,
      &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        margin: calc(.2rem * 2);
        width: 1.6rem;
        height: 1.6rem;
        transition: transform .1s ease;
        border-radius: 50%;
        border: calc(1.6rem / 8) solid currentColor;
      }

      &::after {
        transform: scale(0);
        background-color: ${theme.primary};
        border-color: ${theme.primary};
      }
    }

    label:hover .helper {
      color: ${theme.primary};
    }

    // scss-lint:disable QualifyingElement, NestingDepth
    input:checked {
      ~ .helper {
        &::after {
          transform: scale(0.5);
        }
        &::before {
          color: ${theme.primary};
        }
      }
    }
  }

  .checkbox {

    margin-top: calc(1rem * 2);
    margin-bottom: 1.6rem;
    position: relative;
    .text {
      display: inline-block;
      margin-left: .7rem;
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
      transition: border-color .1s ease;

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
        transition: opacity .1s ease,
          height 0s linear .1s;
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
          transition: height .1s ease;
        }

        &::after {
          height: calc(1.6rem / 2);
        }

        &::before {
          height: calc(1.6rem * 1.2);
          transition-delay: .1s;
        }
      }
    }
  }

  .radio + .radio,
  .checkbox + .checkbox {
    margin-top: 1.6rem;
  }

  .has-error {
    .legend.legend,
    &.form-group .control-label.control-label {
      // Prevent !importantRule
      color: $mf-error-color;
    }

    &.form-group,
    &.checkbox,
    &.radio,
    &.form-radio {
      .form-help,
      .helper {
        color: $mf-error-color;
      }
    }

    .bar {
      &::before {
        background: $mf-error-color;
        left: 0;
        width: 100%;
      }
    }
  }

}
`;
