import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import styled from "styled-components";
import NavItems from "./NavItems";
import EventContainer from "./EventContainer";
import ProductPage from "./ProductPage";
import ShoppingCart from "./ShoppingCart";
import Checkout from "./Checkout";
import querystring from "query-string";

import model_1 from "images/model1.jpg";
import model_2 from "images/model2.jpg";
import model_3 from "images/model3.jpg";

class Store extends Component {
  state = {
    totalCartItems: 5,
    cart: [
      {
        name: "shirt",
        id: 0,
        price: 35,
        img: model_1,
        quantity: 2,
        totalPrice: 70,
        size: "medium"
      },
      {
        name: "shirt2",
        id: 1,
        price: 40,
        img: model_2,
        quantity: 3,
        totalPrice: 120,
        size: "large"
      }
    ],
    subTotal: (35*2) + (40*3)
  };
  shipping = 10;
  tax = .1;
  total = 0;
  productLimit = 10;

  updateTotal() {
    this.total = Math.round(this.state.subTotal * (1 + this.tax)) + this.shipping;

    //checks if cart is empty
    if(this.state.cart.length === 0) this.total = 0;

  }

  handleGetSelectedProduct = product => {
    this.setState({ selectedProduct: product });
  };

  sizeChangeHandler = newSize => {
    const updatedProduct = { ...this.state.selectedProduct, size: newSize };
    this.setState({ selectedProduct: updatedProduct });
  };

  handleAddToCart = (e, product) => {
    e.preventDefault();
    //if id of productpage matches any id in shopping cart, increase quantity by 1,
    // else add the item as a new item
    const index = this.state.cart.findIndex(cartItem => cartItem.id === product.id && cartItem.size === product.size);
    //checks if we've already purchased the product in a certain size
  
    if (index > -1) {
      const productClone = { ...this.state.cart[index] };
      if(productClone.quantity === this.productLimit) return;
      productClone.quantity++;
      productClone.totalPrice += product.price;
      const cartClone = [...this.state.cart];
      cartClone[index] = productClone;
      this.setState(prevState => ({
        cart: cartClone,
        totalCartItems: prevState.totalCartItems + 1,
        subTotal: prevState.subTotal + productClone.price
      }));
      //Add the new product
    } else {
      product.quantity = 1; //introduce quantity
      product.totalPrice = product.price; //introduct totalPrice
      this.setState(prevState => ({
        cart: [...this.state.cart, product],
        totalCartItems: prevState.totalCartItems + 1,
        subTotal: prevState.subTotal + product.price
      }));
    }
  };

  removeItem = index => {
    const product = this.state.cart[index]
    const cartClone = [...this.state.cart.slice(0,index), ...this.state.cart.slice(index+1)]
    this.setState(prevState => ({
      cart: cartClone,
      totalCartItems: prevState.totalCartItems - product.quantity,
      subTotal: prevState.subTotal - product.totalPrice 
    }));
  };

  handleUpdateQuantity = (e, index) => {
    const product = this.state.cart[index];
    const newQuantity = e.target.value
    const difference = newQuantity - product.quantity;
    const cartClone = [...this.state.cart];
    cartClone[index] = {...product, 
      quantity: newQuantity,
    totalPrice: newQuantity * product.price
  };
    this.setState(prevState => {
      return {
        cart: cartClone,
        totalCartItems: prevState.totalCartItems + (difference),
        subTotal: prevState.subTotal + (difference * product.price) 
      };
    });
  };

  componentWillMount() {
    // this.updateTotal();
  }

  componentWillUpdate() {
    // console.log('compnent WILL UPDATE')
    // this.updateTotal();
    // console.log(this.total)
  }

  render() {
    const { cart, totalCartItems, subTotal } = this.state;
    this.updateTotal();
    return (
      <div>
        <NavItems />
        <div>Cart total: {totalCartItems}</div>
        <div>unique products: {cart.length}</div>
        <div>subtotal price: ${subTotal}</div>
        <div>Total price: ${this.total}</div>

        <Switch>
          <RouteWithProps
            path="/store/:productName"
            exact
            products={productData}
            cart={this.state.cart}
            sizeOptions={sizeOptions}
            addToCart={this.handleAddToCart}
            changeSize={this.handleChangeSize}
            productLimit={this.productLimit}
            component={ProductPage}
          />
          <RouteWithProps
            path="/cart"
            exact
            cart={cart}
            removeItem={this.removeItem}
            userOptions
            updateQuantity={this.handleUpdateQuantity}
            component={ShoppingCart}
          />
          <RouteWithProps path="/checkout" exact component={Checkout} />

          <Route path="/" exact render={() => <EventContainer products={productData} />} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Store);

const RouteWithProps = ({ path, exact, strict, component: Component, location, ...rest }) => (
  <Route
    path={path}
    exact={exact}
    strict={strict}
    location={location}
    render={props => <Component {...props} {...rest} />}
  />
);

const productData = [
  {
    name: "shirt",
    price: 35,
    img: model_1
  },
  {
    name: "shirt2",
    price: 40,
    img: model_2
  },
  {
    name: "shirt3",
    price: 45,
    img: model_3
  },
  {
    name: "shirt4",
    price: 50,
    img: model_3
  },
  {
    name: "shirt5",
    price: 35,
    img: model_2
  },
  {
    name: "shirt6",
    price: 35,
    img: model_1
  }
];

function assignProductId(products) {
  for (let i = 0; i < productData.length; i++) {
    productData[i].id = i;
  }
}

assignProductId(productData);

let sizeOptions = [
  { value: "extra small", displayValue: "XS" },
  { value: "small", displayValue: "S" },
  { value: "medium", displayValue: "M" },
  { value: "large", displayValue: "L" },
  { value: "extra large", displayValue: "XL" }
];
