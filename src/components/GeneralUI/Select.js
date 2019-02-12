import React from "react";
import PropTypes from "prop-types";

const Select = props => {
  let options = [];
  //if given max and min value options
  const buildOptions = function(min, max) {
    for (let i = min; i <= max; i++) {
      options.push(i);
    }

    return options;
  };

  if (props.min && props.max) {
    buildOptions(props.min, props.max);
  } else {
    options = props.options;
  }

  return (
    <div className="form-group">
      <select name={props.name} value={props.selectedOption} onChange={props.controlFunc} className="form-select">
        {props.placeholder ? <option value="">{props.placeholder}</option> : null}
        {options.map(opt => {
          return (
            <option key={opt} value={opt}>
              {opt}
            </option>
          );
        })}
      </select>
    </div>
  );
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array,
  //   selectedOption: PropTypes.string,
  controlFunc: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};

export default Select;
