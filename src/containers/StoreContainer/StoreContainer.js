import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import styled from "styled-components";
import NavigationItems from "components/Navigation/NavigationItems/NavigationItems";
import EventContainer from "containers/EventContainer/EventContainer";
import ProductPage from "components/ProductPage/ProductPage";
import ShoppingCart from "components/ShoppingCart/ShoppingCart";
import { Elements } from "react-stripe-elements";
import Checkout from "components/Checkout/Checkout";
import querystring from "query-string";

import model_1 from "images/model1.jpg";
import model_2 from "images/model2.jpg";
import model_3 from "images/model3.jpg";

const sampleProducts = [
  {
    name: "shirt",
    price: 35,
    img: model_1
  },
  {
    name: "shirt2",
    price: 35,
    img: model_2
  },
  {
    name: "shirt3",
    price: 35,
    img: model_3
  },
  {
    name: "shirt4",
    price: 35,
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

class StoreContainer extends Component {
  state = {
    totalCartItems: 5,
    cart: {
      shirt_medium: {
        name: "shirt",
        price: 35,
        img: model_1,
        quantity: 2,
        size: "medium"
      },
      shirt2_large: {
        name: "shirt2",
        price: 35,
        img: model_2,
        quantity: 3,
        size: "large"
      }
    },
    selectedProduct: null
  };

  handleGetSelectedProduct = product => {
    this.setState({ selectedProduct: product });
  };
  sizeChangeHandler = newSize => {
    const updatedProduct = { ...this.state.selectedProduct, size: newSize };
    this.setState({ selectedProduct: updatedProduct });
  };

  handleAddToCart = e => {
    e.preventDefault();
    console.log("purchase btn clicked");
    //if id of productpage matches any id in shopping cart, increase quantity by 1,
    // else add the item as a new item
    const productId = this.state.selectedProduct.name + "_" + this.state.selectedProduct.size;
    const productInCart = { ...this.state.cart[productId] };
    console.log(productInCart);
    //checks if we've already purchased the product in a certain size
    if (Object.keys(productInCart).length > 0) {
      productInCart.quantity++;
      this.setState(prevState => ({
        cart: {
          ...this.state.cart,
          [productId]: productInCart
        },
        totalCartItems: prevState.totalCartItems + 1
      }));
    } else {
      this.setState(prevState => ({
        cart: {
          ...this.state.cart,
          [productId]: {
            ...this.state.selectedProduct,
            quantity: 1,
            // purchased: true,
            size: this.state.selectedProduct.size
          }
        },
        totalCartItems: prevState.totalCartItems + 1
      }));
    }
  };

  removeItem = product => {
    const newCart = { ...this.state.cart };
    delete newCart[product];
    this.setState(prevState => ({
      cart: newCart,
      totalCartItems: prevState.totalCartItems - prevState.cart[product].quantity
    }));
  };

  handleUpdateQuantity = (e, productId) => {
    const newQuantity = e.target.value;
    this.setState(prevState => {
      return {
        cart: {
          ...this.state.cart,
          [productId]: {
            ...this.state.cart[productId],
            quantity: newQuantity
          }
        },
        totalCartItems: prevState.totalCartItems + (newQuantity - prevState.cart[productId].quantity)
      };
    });
  };

  componentDidUpdate() {
    console.log(this.state.cart);
  }


  render() {
    return (
      <div>
        <NavigationItems />
        <div>Cart total: {this.state.totalCartItems}</div>
        <div>unique products: {Object.keys(this.state.cart).length}</div>
        <Elements>
          <Checkout />
        </Elements>

        <Switch>
          <Route
            path="/store/:productName"
            exact
            render={({ match }) => {
              console.log(match.params);
              const selectedProduct = sampleProducts.find(product => match.params.productName === product.name);
              return (
                <ProductPage
                  product={selectedProduct}
                  addToCart={this.handleAddToCart}
                  sizeChange={this.sizeChangeHandler}
                  handleGetSelectedProduct={this.getSelectedProduct}
                />
              );
            }}
          />
          {/* <Route
            path="/cart/"
            exact
            render={() => {
              return (
                <ShoppingCart
                  cart={this.state.cart}
                  removeItem={this.removeItem}
                  updateQuantity={this.handleUpdateQuantity}
                />
              );
            }}
          /> */}
          <RouteWithProps 
          path="/cart"
          exact
          cart={this.state.cart}
          removeItem={this.removeItem}
          updateQuantity={this.handleUpdateQuantity} 
          component={ShoppingCart}
          />
          <Route path="/" exact render={() => <EventContainer products={sampleProducts} />} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default withRouter(StoreContainer);

const RouteWithProps = ({ path, exact, strict, component:Component, location, ...rest }) => (
  <Route
    path={path}
    exact={exact}
    strict={strict}
    location={location}
    render={(props) => <Component {...props} {...rest} />}
    />
)