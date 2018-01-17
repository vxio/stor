// CardSection.js
import React from "react";
import { CardElement } from "react-stripe-elements";

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
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Card details
          <CardElement
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onReady={this.handleReady}
            {...createOptions(this.props.fontSize)}
          />
        </label>
        <button>Pay</button>
      </form>
    );
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
