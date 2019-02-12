import React from "react";
import { TextInput, AddressInputs } from "./TextInput";
import { Form } from "react-final-form";
import styled from "styled-components";
import theme, {media } from "../theme";
import Button from "./GeneralUI/Button";
import Checkbox from "./GeneralUI/Checkbox";
import * as validator from "./validators";
import PropTypes from 'prop-types';

class ContactForm extends React.Component {
  state = {
    useSameAddress: this.props.customerInfo
      ? JSON.stringify(this.props.customerInfo.shipping) === JSON.stringify(this.props.customerInfo.billing)
      : true
  };

  moveCaretAtEnd(e) {
    var temp_value = e.target.value;
    e.target.value = "";
    e.target.value = temp_value;
  }

  sameAddressHandler = values => {
    this.setState(prevState => {
      const updatedState = !prevState.useSameAddress;
      if (!updatedState) {
        values.shipping = undefined;
      }
      return { useSameAddress: updatedState };
    });
  };

  render() {
    const { useSameAddress } = this.state;
    const { id, onSubmit, customerInfo } = this.props;
    const { required, validEmail } = validator;

    return (
      <Styles id={id}>
        <Form
          onSubmit={onSubmit}
          initialValues={customerInfo}
          render={({ handleSubmit, reset, submitting, pristine, values }) => {
            //sets shipping address equal to billing address
            if (useSameAddress) {
              values.shipping = values.billing;
            }
            return (
              <form onSubmit={handleSubmit}>
                <div className="header">Account Information</div>
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
                <Checkbox useSameAddress={useSameAddress} onChange={() => this.sameAddressHandler(values)}>
                  Same as billing address
                </Checkbox>
                {!useSameAddress && <AddressInputs purpose="shipping" />}
                <div className="buttons">
                  <Button color="primary" type="submit" disabled={submitting}>
                    Submit
                  </Button>
                  {/* <Button type="button" onClick={reset} disabled={submitting || pristine}>
                    Clear Form
                  </Button> */}
                </div>
                {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
              </form>
            );
          }}
        />
      </Styles>
    );
  }
}

export default ContactForm;

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  customerInfo: PropTypes.object.isRequired,
  id: PropTypes.string
};  


const Styles = styled.div`
  grid-column: full;
  border-top: 6px solid ${theme.primary};
  justify-self: center;

  button {
    margin: 2rem auto;
  }
  form {
    width: 45rem;
    padding: 3rem 3.5rem;
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.2);
    border-radius: 3px;

    ${media.phone`
      width: 42rem;
    `};
    ${media.phoneSmall`
      width:36rem;
    `};

    .header {
      margin-bottom: 4rem;
      text-align: center;
      font-size: 2.2rem;
      font-weight: 600;
    }
    .subheader {
      font-size: 2.2rem;
      margin: 2rem;
      text-align: center;
    }
  }
`;
