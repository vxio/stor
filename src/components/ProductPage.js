import React, { Component, Fragment } from "react";
import styled from "styled-components";
import Input from "./GeneralUI/Input";
import RadioInput from "./GeneralUI/RadioInput";
import WarningText from "./WarningText";
import ReactImageMagnify from "react-image-magnify";

class ProductPage extends Component {
  constructor(props) {
    super(props);
    const { products, match } = props;
    this.product = products.filter(product => match.params.productName === product.name)[0];
    this.sizeOptions = props.sizeOptions;
    this.productLimit = props.productLimit;

    this.state = {
      selectedSize: null,
      quantityLimitReached: false
    };
  }

  getProductInCart() {
    return this.props.cart.find(product => this.product.id === product.id && this.product.size === product.size);
  }

  checkQuantityLimit() {
    const product = this.getProductInCart();
    if (!product) return;
    if (product.quantity === this.productLimit && !this.state.quantityLimitReached) {
      this.setState({
        quantityLimitReached: true
      });
    }
  }

  componentWillMount() {
    window.scrollTo(0, 0);
    this.checkQuantityLimit();
    console.log(this.state.quantityLimitReached);
  }

  componentDidUpdate() {
    this.checkQuantityLimit();
  }

  updateProduct = eventValue => {
    this.setState({ selectedSize: eventValue });
    this.product.size = eventValue;
    this.checkQuantityLimit();
    //if quantity is not reached, reset state
    const product = this.getProductInCart();
    if (!product || product.quantity < this.productLimit) {
      this.setState({
        quantityLimitReached: false
      });
    }
  };

  render() {
    const { selectedSize, quantityLimitReached } = this.state;
    console.log(this.product);
    return (
      <Fragment>
        {selectedSize ? this.product.size : <WarningText>This is a warning bietcffh</WarningText>}
        <h1>This is the product page of {this.product.name}</h1>
        <h2>${this.product.price}</h2>
        <hr />
        <h4>Choose size: __</h4>
        <form onSubmit={e => this.props.addToCart(e, this.product)}>
          <RadioInput inputValues={this.sizeOptions} changed={this.updateProduct} />

          <button disabled={!selectedSize || quantityLimitReached}>Add to Cart</button>
        </form>
        <img src={this.product.img} alt="" height="500px"/>

      </Fragment>
    );
  }
}

export default ProductPage;
