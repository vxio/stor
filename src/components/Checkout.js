import React, { Fragment } from "react";
import { Elements, CardElement } from "react-stripe-elements";

import { render } from "react-dom";
import { Form, Field } from "react-final-form";
import { FORM_ERROR } from "final-form";
import { checkValidity } from "./Utility";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
  console.log(values)
};

const required = value => (value ? undefined : true);
const mustBeNumber = value => (isNaN(value) ? "Must be a number" : undefined);
const checkDigits = digits => value =>
  !isNaN(value) && value.length === digits ? undefined : `Must be ${digits} digits`;
const minValue = min => value => (isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`);
const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);

const TextInput = ({ name, label, purpose, isEmail, validate, ...props }) => {
  return (
<div>
    <Field name={`${purpose}.${name}`} component="input" placeholder={`${label} Street`} validate={validate}>
      {({ input, meta }) => {
        // const validInput = meta.error && meta.touched;
        // console.log("input", input)
        // console.log("meta", meta)
        return <Fragment>
            <label>{label}</label>
            <input style={(meta.submitFailed && meta.error) ? { border: "1px solid red" } : {}} 
            {...input} type={isEmail ? "email" : "text"} placeholder={`${label}`} />
            {meta.submitFailed && <span>{meta.error}</span>}
          </Fragment>;
      }}
    </Field>
</div>
  );
};

const AddressInputs = ({ purpose }) => {
  //Street
  return (
    <Fragment>
      <TextInput name="street" label="Street" purpose={purpose} validate={required} />
      <TextInput name="city" label="City" purpose={purpose} validate={required} />
      <TextInput name="zipcode" label="Zipcode" purpose={purpose} validate={composeValidators(checkDigits(5),required)
      } />
      
    </Fragment>
  );
};

class Checkout extends React.Component {
  handleBlur = () => {
    console.log("[blur]");
  };
  handleChange = change => {
    console.log("[change]", change);
  };
  handleClick = () => {
    console.log("[click]");
  };
  handleFocus = () => {
    console.log("[focus]");
  };
  handleReady = () => {
    console.log("[ready]");
  };
  handleSubmit = ev => {
    ev.preventDefault();
    console.log("Form submitted!");
    // this.props.stripe.createToken().then(payload => console.log(payload));
  };

  render() {
    return <Fragment>

        <Form onSubmit={onSubmit} render={({ handleSubmit, reset, submitting, pristine, values }) => <form onSubmit={handleSubmit}>
        <Elements>
            <label>
              Card details
              <CardElement onBlur={this.handleBlur} onChange={this.handleChange} onFocus={this.handleFocus} onReady={this.handleReady} {...createOptions(this.props.fontSize)} />
            </label>
            {/* <button>Pay</button> */}
        </Elements>
              {/* Testing */}
              <TextInput name="firstName" label="First Name" validate={required} />
              <TextInput name="lastName" label="Last Name" validate={required} />
              <TextInput name="email" label="Email" isEmail validate={required} />
              <h2>Billing Address</h2>
              <AddressInputs purpose="billing" />
              <h2>Shipping Address</h2>
              <AddressInputs purpose="shipping" />

              {/* <Field name="lastName" validate={required}>
                {({ input, meta }) => {
                  return <div>
                      <label>Last Name</label>
                      <input style={!(meta.error && meta.touched) ? {} : { border: "1px solid red" }} {...input} type="text" placeholder="Last Name" />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>;
                }}
              </Field> */}

              <div className="buttons">
                <button type="submit" disabled={submitting}>
                  Submit
                </button>
                <button type="button" onClick={reset} disabled={submitting || pristine}>
                  Clear Form
                </button>
              </div>
              <pre>{JSON.stringify(values, 0, 2)}</pre>
            </form>} />
      </Fragment>;
  }
}

const createOptions = fontSize => {
  return {
    style: {
      base: {
        fontSize,
        color: "#424770",
        letterSpacing: "0.025em",
        fontFamily: "Source Code Pro, Menlo, monospace",
        "::placeholder": {
          color: "#aab7c4"
        }
      },
      invalid: {
        color: "#9e2146"
      }
    }
  };
};

export default Checkout;
