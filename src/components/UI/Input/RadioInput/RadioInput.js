import React, { Component } from "react";

class RadioInput extends Component {
  //inputValues: [{value: 'orange', displayValue: 'Orange' }, etc...]
  state = {
    selected: null
  };

  onChangeHandler = e => {
    console.log("clicked");
    this.setState({ selected: e.target.value });
    this.props.changed(e.target.value);
  };

  render() {
    let inputElements = this.props.inputValues.map(input => (
      <label key={input.value}>
        <input
          type="radio"
          name={this.props.name}
          value={input.value}
          onChange={this.onChangeHandler}
          checked={this.state.selected === input.value}
          data-displayvalue={input.displayValue}
        />
        {input.displayValue}
      </label>
    ));
    return (
      <div>
        <label>{this.props.label}</label>
        {this.state.selected}
        {inputElements}
      </div>
    );
  }
}

export default RadioInput;
