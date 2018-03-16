import React, { Fragment } from "react";
import { Elements, CardElement } from "react-stripe-elements";

import { render } from "react-dom";
import { Form, Field } from "react-final-form";
// import { FORM_ERROR } from "final-form";
import { checkValidity } from "./Utility";
import styled from "styled-components";
import theme from "../theme";
import OrderSummary from "./OrderSummary";
import { Grid_Styled } from "./ShoppingCart";
import Button from "./GeneralUI/Button";

const required = value => (value ? undefined : "Required");
const onlyNumbers = value => (isNaN(value) ? "Must be a number" : undefined);
const onlyLetters = value => (/^[a-zA-Z\s]*$/.test(value) ? undefined : "Must only contain letters");

const checkDigits = (digits, label) => value =>
  !isNaN(value) && value.length === digits ? undefined : `Enter a ${digits} digit ${label}`;
const validEmail = value => {
  const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return pattern.test(value) ? undefined : "Enter a valid email address";
};

const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);

const TextInput = ({
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
        // console.log("input", input)
        name === "city" && console.log(purpose, name, meta);

        return (
          <FormGroup hasValue={input.value} invalidInput={invalidInput} className="form-group">
            <input
              style={(invalidInput && { borderColor: "#F15C5C" }) || {}}
              {...input}
              disabled={
                disabled // {...input}
              }
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
  
  .error-msg {
    /* margin-top: 8rem; */
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
   /* -webkit-appearance: none; */
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
      /* border-bottom: 2px solid ${theme.primary}; */
    }
  }
`;

const AddressInputs = ({ purpose }) => {
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

class ContactForm extends React.Component {
  state = {
    sameAddress: this.props.customerInfo ? this.props.customerInfo.shipping === this.props.customerInfo.billing : true
  };

  componentDidMount() {
    const initialFocus = document.getElementById("initial-focus");
  }

  moveCaretAtEnd(e) {
    var temp_value = e.target.value;
    e.target.value = "";
    e.target.value = temp_value;
  }

  render() {
    const { id, onSubmit, customerInfo } = this.props;

    return (
      <Styles id={id}>
        <Form
          onSubmit={onSubmit}
          initialValues={customerInfo}
          render={({ handleSubmit, reset, submitting, pristine, values }) => {
            //set initial values for testing
            // values.main.firstName = 'vince'
            //sets shipping address equal to billing address
            if (this.state.sameAddress) {
              values.shipping = values.billing;
            }
            return (
              <form onSubmit={handleSubmit}>
                <div className="header">
                  <span>Account Information</span>
                </div>
                <TextInput
                  name="firstName"
                  id="initial-focus"
                  label="First Name"
                  purpose="main"
                  charLimit="35"
                  autoFocus
                  onFocus={this.moveCaretAtEnd}
                  validate={required}
                />
                <TextInput name="lastName" label="Last Name" purpose="main" charLimit="35" validate={required} />
                <TextInput name="email" label="Email" isEmail purpose="main" charLimit="254" validate={validEmail} />
                <h2 className="subheader">Billing Address</h2>
                <AddressInputs purpose="billing" />
                <h2 className="subheader">Shipping Address</h2>
                <div className="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => {
                        this.setState(prevState => {
                          const updatedState = !prevState.sameAddress;
                          if (!updatedState) {
                            values.shipping = undefined;
                          }
                          return { sameAddress: updatedState };
                        });
                      }}
                      defaultChecked={this.state.sameAddress}
                    />
                    <i className="helper" />
                    <span className="text">Same as billing address</span>
                  </label>
                </div>
                {this.state.sameAddress ? null : <AddressInputs purpose="shipping" />}
                <div className="buttons">
                  <Button color="primary" type="submit" disabled={submitting}>
                    Submit
                  </Button>
                  {/* <Button type="button" onClick={reset} disabled={submitting || pristine}>
                    Clear Form
                  </Button> */}
                </div>
                <pre>{JSON.stringify(values, 0, 2)}</pre>
              </form>
            );
          }}
        />
      </Styles>
    );
  }
}
export default ContactForm;

const Styles = styled.div`
  grid-column: full;
  border-top: 6px solid ${theme.primary};
  justify-self: center;

  button {
    margin: 2rem auto;
  }
  form {
    width: 45rem;
    /* margin: 10px auto; */
    padding: 3rem 3.5rem;
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    .form-radio,
    .form-group {
      position: relative;
      margin-bottom: 2rem;
    }

    .header {
      margin-bottom: 4rem;
      text-align: center;
      span {
        font-size: 2.2rem;
        font-weight: 600;
      }
    }
    .subheader {
      font-size: 2.2 rem;
      margin-bottom: 2.5rem;
      text-align: center;
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
        /* width: 2rem; */
        opacity: 0.00000001;
        position: absolute;
        left: 0;
        cursor: pointer;
        margin-left: -1rem;
      }
    }

    .radio {
      margin-bottom: 1.6rem;

      .helper {
        position: absolute;
        top: calc(1.6rem / 4);
        left: calc(1.6rem / 4);
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
          margin: calc(0.2rem * 2);
          width: 1.6rem;
          height: 1.6rem;
          transition: transform 0.1s ease;
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
