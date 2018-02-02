import React, { Component, Fragment } from "react";
import styled from "styled-components";
import RadioInput from "./GeneralUI/RadioInput";
import WarningText from "./WarningText";
import ReactImageMagnify from "react-image-magnify";
import { Form, Field } from "react-final-form";

class ProductPage extends Component {
  constructor(props) {
    super(props);
    const { products, match, productLimit, sizeOptions } = props;
    this.product = products.filter(product => match.params.productName === product.name)[0];

    Object.assign(this, { productLimit, sizeOptions });

    this.state = {
      selectedSize: false,
      warningText: "",
      quantityLimitReached: false
    };
  }

  getProductInCart() {
    return this.props.cart.find(product => {
      return this.product.id === product.id && this.product.size === product.size;
    });
  }

  checkQuantityLimit() {
    const product = this.getProductInCart();
    if (!product) return;
    if (product.quantity === this.productLimit && !this.state.quantityLimitReached) {
      this.setState({
        quantityLimitReached: true,
        warningText: "Limit of 10 per item in each size"
      });
    }
  }

  componentWillMount() {
    window.scrollTo(0, 0);
    console.log(this.sizeOptions);
  }

  componentDidUpdate() {
    this.checkQuantityLimit();
  }

  updateProduct = eventValue => {
    this.setState(
      {
        selectedSize: eventValue,
        warningText: ""
      },
      function() {
        this.product.size = eventValue;
        this.checkQuantityLimit();
        //if quantity is not reached, reset state
        const product = this.getProductInCart();
        if (!product || product.quantity < this.productLimit) {
          this.setState({
            quantityLimitReached: false
          });
        }
      }
    );
  };

  onSubmit = values => {
    this.props.addToCart(this.product);
    if (!this.state.selectedSize) {
      this.setState({
        warningText: "Please select a size"
      });
    }
  };

  render() {
    const { selectedSize, quantityLimitReached, warningText } = this.state;
    return (
      <Styled>
        <img src={this.product.img} alt={this.product.img} height="500px" />
        <div className="product-info">
          <h2 className="product-name">{this.product.name}</h2>
          <h3 className="product-price">${this.product.price}</h3>
          {/* <form
            onSubmit={e => {
              this.props.addToCart(e, this.product);
              if (!selectedSize) {
                this.setState({
                  warningText: "Please select a size"
                });
              }
            }}
          >
            {warningText && <WarningText>{warningText}</WarningText>}
            <RadioInput inputValues={this.sizeOptions} changed={this.updateProduct} />
            <button disabled={quantityLimitReached}>Add to Cart</button>
          </form> */}
          <Form
            onSubmit={this.onSubmit}
            render={({ handleSubmit, reset, submitting, pristine, values }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <div>
                    <RadioInputs name="size" options={this.sizeOptions} customOnChange={this.updateProduct} />
                    {warningText && <WarningText>{warningText}</WarningText>}
                    <button disabled={quantityLimitReached}>Add to Cart</button>
                  </div>
                  <div />
                  <pre>{JSON.stringify(values, 0, 2)}</pre>
                </form>
              );
            }}
          />
          <div className="product-details">
            <p>100% Cotton</p>
            <p>Machine washable</p>
            <p>Made in Omaha, NE</p>
          </div>
          <div className="product-description">
            <h3>Description</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam ad dolor iure similique magnam, totam
              accusantium illo natus error. Dolore quidem dignissimos fugiat facere unde harum dolor dicta aliquid
              quibusdam.
            </p>
          </div>
        </div>
      </Styled>
    );
  }
}

export default ProductPage;

const Styled = styled.div`
  grid-column: center;

  display: flex;

  .product-info {
    .product-name {
      font-size: 2rem;
    }
    .product-price {
      font-size: 2rem;
    }
  }
`;

const InputStyles = styled.div`
  display: flex;
  justify-content: space-between;
  width: 20rem;
  input {
    display: none;
    & + label:hover,
    &:checked + label {
      border: 1px solid red;
    }
  }
  label {
    display: inline-block;
    cursor: pointer;
    font-size: 1.6rem;
    border: 1px solid transparent;
    padding: 0.25rem 0.5rem;
  }
`;

const RadioInputs = props => {
  const { name, options, customOnChange } = props;

  function createRadioInputs(name, options) {
    return (
      <InputStyles>
        {options.map((option, i) => (
          <Field key={i} name={name} component="input">
            {({ input, meta }) => {
              return (
                <Fragment>
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
                </Fragment>
              );
            }}
          </Field>
        ))}
      </InputStyles>
    );
  }

  return <div>{createRadioInputs(name, options)}</div>;
};
