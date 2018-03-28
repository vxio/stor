import React, { Component } from "react";
import PropTypes from "prop-types";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.productQuantity };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment(e) {
    if (this.state.value >= this.props.max) {
      return this.state.value;
    } else {
      this.setState(
        prevState => ({
          value: Number(prevState.value) + 1
        }),
        function() {
          this.props.updateQuantity(this.state.value, this.props.productId);
        }
      );
    }

    // e.preventDefault();
  }

  decrement(e) {
    e.preventDefault();
    if (this.state.value <= this.props.min) {
      return this.state.value;
    } else {
      this.setState(
        prevState => ({
          value: Number(prevState.value) - 1
        }),
        function() {
          this.props.updateQuantity(this.state.value, this.props.productId);
        }
      );
    }
  }

  updateValue(input) {
    this.setState(
      {
        value: input
      },
      function() {
        this.props.updateQuantity(this.state.value, this.props.productId);
      }
    );
  }

  feed(e) {
    const userInput = this.refs.feedQty.value;
    if (userInput > this.props.max) {
      this.updateValue(this.props.max);
    } else {
      this.updateValue(userInput);
    }
  }

  resetQuantity() {
    this.setState({
      value: 1
    });
  }
  render() {
    return (
      <div className="stepper-input">
        <a href="#" className="decrement" onClick={this.decrement}>
          –
        </a>
        <input
          ref="feedQty"
          type="number"
          className="quantity"
          value={this.state.value}
          onChange={this.feed.bind(this)}
          onBlur={() => console.log(5)}
          max={this.props.max}
          min={this.props.min}
        />
        <a href="#" className="increment" onClick={this.increment}>
          +
        </a>
      </div>
    );
  }
}

Counter.propTypes = {
  value: PropTypes.number
};

export default Counter;
