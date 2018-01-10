import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import styled from "styled-components";
import NavigationItems from "components/Navigation/NavigationItems/NavigationItems";
import EventContainer from "containers/EventContainer/EventContainer";
import ProductPage from "components/ProductPage/ProductPage";
import querystring from "query-string";

import model_1 from "images/model1.jpg";
import model_2 from "images/model2.jpg";
import model_3 from "images/model3.jpg";

class StoreContainer extends Component {
  /*
   an item (object) should have:
   - name (is unique)
   - price
   - size
   - quantity
   - ID: name + size
      - if same size is added to cart, search for ID and add one
  */

  state = {
    cart: {},
    products: [
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
    ]
  };

  currentProduct;

  getCurrentProduct = location => {
    const pathName = location.pathname;
    const productName = pathName.split("/")[2];

    this.currentProduct = this.state.products.find(product => productName === product.name);
  };

  inputChangeHandler = e => {
    console.log(e.target.value);
    this.currentProduct.size = e.target.value;
  };

  purchaseHandler = e => {
    e.preventDefault();
    console.log("purchase btn clicked");
    //if id of productpage matches any id in shopping cart, increase quantity by 1,
    // else add the item as a new item
    const productId = this.currentProduct.name + "-" + this.currentProduct.size;
    const productInCart = { ...this.state.cart[productId] };
    console.log(productInCart);
    //checks if we've already purchased the product in a certain size
    if (Object.keys(productInCart).length > 0) {
      productInCart.quantity++;
      this.setState({
        cart: {
          ...this.state.cart,
          [productId]: productInCart
        }
      });
    } else {
      this.setState({
        cart: {
          ...this.state.cart,
          [productId]: {
            ...this.currentProduct,
            quantity: 1,
            purchased: true,
            size: this.currentProduct.size
          }
        }
      });
    }
  };

  render() {
    this.getCurrentProduct(this.props.location);
    console.log(this.state.cart);
    return (
      <div>
        <NavigationItems />
        <div>Cart counter: {Object.keys(this.state.cart).length}</div>
        <Switch>
          <Route
            path="/store/"
            render={() => {
              return (
                <ProductPage
                  product={this.currentProduct}
                  purchase={this.purchaseHandler}
                  inputChange={this.inputChangeHandler}
                />
              );
            }}
          />
          <Route path="/" exact render={() => <EventContainer products={this.state.products} />} />
          {/* <Redirect to="/" /> */}
        </Switch>
      </div>
    );
  }
}

export default withRouter(StoreContainer);
