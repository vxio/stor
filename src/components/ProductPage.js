import React, { Component, Fragment } from "react";
import styled from "styled-components";
import Input from "./GeneralUI/Input";
import RadioInput from "./GeneralUI/RadioInput";
import WarningText from "./WarningText";
import ReactImageMagnify from "react-image-magnify";

class ProductPage extends Component {
  constructor(props) {
    super(props);
    const { products, match, productLimit, sizeOptions } = props;
    this.product = products.filter(product => match.params.productName === product.name)[0];
    // this.sizeOptions = props.sizeOptions;
    // this.productLimit = props.productLimit;

    Object.assign(this, { productLimit, sizeOptions });

    this.state = {
      selectedSize: null,
      quantityLimitReached: false
    };
  }

  getProductInCart() {
    return this.props.cart.find(product => {
      return this.product.id === product.id && this.product.size === product.size
    });
  }

  checkQuantityLimit() {
    const product = this.getProductInCart();
    console.log('checking quantity limit')
    if (!product) return console.log('returned');
    if (product.quantity === this.productLimit && !this.state.quantityLimitReached) {
      console.log('setting limit reached to true')
      this.setState({
        quantityLimitReached: true
      });
    }
  }

  componentWillMount() {
    window.scrollTo(0, 0);
    // this.checkQuantityLimit();
    // console.log(this.state.quantityLimitReached);
  }

  componentDidUpdate() {
    this.checkQuantityLimit();
  }

  updateProduct = eventValue => {

    this.setState({ selectedSize: eventValue }, function() {
      this.product.size = eventValue;
          console.log(this.product);
      this.checkQuantityLimit();
      //if quantity is not reached, reset state
      const product = this.getProductInCart();
      if (!product || product.quantity < this.productLimit) {
        console.log('limit set to  false')
        this.setState({
          quantityLimitReached: false
        });
      }
    });
  };

  render() {
    console.log('Product', this.product)
    console.log(process.env.PUBLIC_URL);
    const { selectedSize, quantityLimitReached } = this.state;
    return <Fragment>
        {selectedSize ? this.product.size : <WarningText>This is a warning bietcffh</WarningText>}
        <h1>This is the product page of {this.product.name}</h1>
        <h2>${this.product.price}</h2>
        <hr />
        <h4>Choose size: __</h4>
        <form onSubmit={e => this.props.addToCart(e, this.product)}>
          <RadioInput inputValues={this.sizeOptions} changed={this.updateProduct} />

          <button disabled={!selectedSize || quantityLimitReached}>Add to Cart</button>
        </form>
        <img src={this.product.img} alt={this.product.img} height='500px'/>
      </Fragment>;
  }
}

export default ProductPage;
