import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import styled from "styled-components";
import { NavItem, NavItems } from "./NavItems";
import StoreFront from "./StoreFront";
import Shop from "./Shop";
import ProductPage from "./ProductPage";
import ShoppingCart from "./ShoppingCart";
import Checkout from "./Checkout";
import OrderSummary from "./OrderSummary";
import querystring from "query-string";
import axios from "axios";
import model_1 from "images/model1.jpg";
import model_2 from "images/model2.jpg";
import model_3 from "images/model3.jpg";
import * as Icon from "react-feather";

class Store extends Component {
  state = {
    loading: true,
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
    subTotal: 35 * 2 + 40 * 3,
    shouldBounce: false
  };

  shipping = 10;
  taxRate = 0.1;
  tax = 0;
  total = 0;
  productLimit = 10;
  formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });

  getProducts() {
    //use this url for localhost. May need to use a different url in production
    const url = "products.json";
    console.log(url);

    axios.get(url).then(response => {
      console.log(response);
      this.setState({
        products: response.data.products,
        sizeOptions: response.data.sizeOptions,
        loading: false
      });
    });
  }

  componentWillMount() {
    axios.defaults.baseURL = "/";
    this.getProducts();
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  updateTotal() {
    this.tax = +(this.state.subTotal * this.taxRate).toFixed(2);
    this.total = +(this.state.subTotal + this.tax + this.shipping).toFixed(2);

    //checks if cart is empty
    if (this.state.cart.length === 0) this.total = 0;
  }

  handleGetOrderData = () => {
    const { totalCartItems, subTotal } = this.state;
    const { shipping, tax, total } = this;
    const orderInfo = {
      totalCartItems,
      subTotal: this.formatter.format(subTotal),
      shipping: this.formatter.format(shipping),
      tax: this.formatter.format(tax),
      total: this.formatter.format(total)
    };
    return orderInfo;
  };

  handleGetSelectedProduct = product => {
    this.setState({ selectedProduct: product });
  };

  sizeChangeHandler = newSize => {
    const updatedProduct = { ...this.state.selectedProduct, size: newSize };
    this.setState({ selectedProduct: updatedProduct });
  };

  handleAddToCart = product => {
    // e.preventDefault();
    console.log(product);
    if (!product.size) {
      return;
    }
    if (this.state.totalCartItems > 0) {
      this.setState({ shouldBounce: true }, () => {
        setTimeout(() => this.setState({ shouldBounce: false }), 300);
      });
    }

    //if id of productpage matches any id in shopping cart, increase quantity by 1,
    // else add the item as a new item
    const index = this.state.cart.findIndex(cartItem => cartItem.id === product.id && cartItem.size === product.size);
    //checks if we've already purchased the product in a certain size

    if (index > -1) {
      const productClone = { ...this.state.cart[index] };
      if (productClone.quantity === this.productLimit) return;
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
    const product = this.state.cart[index];
    const cartClone = [...this.state.cart.slice(0, index), ...this.state.cart.slice(index + 1)];
    this.setState(prevState => ({
      cart: cartClone,
      totalCartItems: prevState.totalCartItems - product.quantity,
      subTotal: prevState.subTotal - product.totalPrice
    }));
  };

  handleClearCart = () => {
    this.setState({
      totalCartItems: 0,
      cart: [],
      subTotal: 0
    });
  };

  handleUpdateQuantity = (e, index) => {
    const product = this.state.cart[index];
    const newQuantity = +e.target.value;
    const difference = newQuantity - product.quantity;
    const cartClone = [...this.state.cart];
    cartClone[index] = {
      ...product,
      quantity: newQuantity,
      totalPrice: newQuantity * product.price
    };
    this.setState(prevState => {
      return {
        cart: cartClone,
        totalCartItems: prevState.totalCartItems + difference,
        subTotal: prevState.subTotal + difference * product.price
      };
    });
  };

  componentWillUpdate() {
    // console.log('compnent WILL UPDATE')
    // this.updateTotal();
    // console.log(this.total)
  }

  render() {
    if (this.state.loading) return <h1>Loading biitch</h1>;
    const { cart, totalCartItems, subTotal, shouldBounce } = this.state;
    let cartLink = totalCartItems ? totalCartItems + " item" : undefined;
    if (totalCartItems > 1) cartLink += "s";

    this.updateTotal();
    return (
      <Styled>
        <NavItems>
          <NavItem to="/">Home</NavItem>
          <NavItem to="/shop">Shop</NavItem>
          <NavItem to="/checkout">Checkout</NavItem>
          <CountContainer notEmpty={cartLink} shouldBounce={shouldBounce} totalCartItems={totalCartItems}>
            <NavItem to="/cart">
              <Icon.ShoppingBag />
              <span>{cartLink}</span>
            </NavItem>
          </CountContainer>
        </NavItems>
        {/* 
        <div>
          <div>Cart total: {totalCartItems}</div>
          <div>unique products: {cart.length}</div>
          <div>subtotal price: ${subTotal}</div>
          <div>tax: ${this.tax}</div>
          <div>Total price: ${this.total}</div>
        </div> */}
        <Switch>
          <RouteWithProps
            path="/shop/:productName"
            exact
            products={this.state.products}
            cart={this.state.cart}
            sizeOptions={this.state.sizeOptions}
            addToCart={this.handleAddToCart}
            changeSize={this.handleChangeSize}
            productLimit={this.productLimit}
            component={ProductPage}
          />
          <RouteWithProps path="/shop" exact products={this.state.products} component={Shop} />
          <RouteWithProps
            path="/cart"
            exact
            cart={this.state.cart}
            orderData={this.handleGetOrderData()}
            removeItem={this.removeItem}
            userOptions
            updateQuantity={this.handleUpdateQuantity}
            component={ShoppingCart}
          />
          <RouteWithProps
            path="/checkout"
            clearCart={this.handleClearCart}
            getOrderData={this.handleGetOrderData}
            exact
            cart={cart}
            component={Checkout}
          />
          <RouteWithProps path="/order-summary" exact component={OrderSummary} />

          <Route path="/" exact render={() => <StoreFront products={this.state.products} />} />
          <Redirect to="/" />
        </Switch>
      </Styled>
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

const Styled = styled.div`
  display: grid;
  grid-template-rows: 5rem auto;
  grid-template-columns:
    [full-start] minmax(6rem, 1fr) [center-start] repeat(8, [col-start] minmax(min-content, 15rem) [col-end])
    [center-end] minmax(6rem, 1fr)[full-end];
`;

const CountContainer = styled.div`
  position: relative;

  & * {
    transition: transform 0.3s ease-in;
  }
  & svg {
    /* transition: translation-duration .3s ease-in; */
    /* transition-duration: .3s; */
    transform: ${props => props.notEmpty && `translateX(-3rem)`};
    animation: ${props => props.shouldBounce && `bounce .4s`};
  }
  & span {
    position: absolute;
    animation: ${props => props.notEmpty && `color-me-in 0.3s cubic-bezier(1,.01,1,1)`};
  }

  @keyframes color-me-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes bounce {
    0% {
      transform: translate(-3rem, 0);
    }
    50% {
      transform: translate(-3rem, -0.6rem);
    }
    100% {
      transform: translate(-3rem, 0);
    }
  }
`;
