import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import styled from "styled-components";
import theme from "../theme";
import { NavItem, NavItems } from "./NavItems";
import StoreFront from "./StoreFront";
import Shop from "./Shop";
import ProductPage from "./ProductPage";
import ShoppingCart from "./ShoppingCart";
import Checkout from "./Checkout";
import OrderSummary from "./OrderSummary";
import axios from "axios";
import * as Icon from "react-feather";

export class Store extends Component {
  state = {
    loading: true,
    totalCartItems: 0,
    cart: [],
    shouldBounce: false,
    subTotal: 0
  };

  products;
  categorizedProducts = {};
  sizeOptions = {};

  shipping = 10;
  taxRate = 0.1;
  tax = 0;
  total = 0;
  productLimit = 10;
  formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });

  generateRandom(number) {
    return Math.floor(Math.random() * number);
  }

  generateRandomProduct() {
    const product_keys = Object.keys(this.categorizedProducts);
    const randomCategoryNum = this.generateRandom(product_keys.length);
    const category = this.categorizedProducts[product_keys[randomCategoryNum]]; //array of products
    const product = category[this.generateRandom(category.length)];
    return product;
  }

  insertRandomCartItems(numOfCartItems) {
    let cartItemsInserted = 0;
    let newCart = [];
    while (cartItemsInserted < numOfCartItems) {
      const product = this.generateRandomProduct();
      const randomSize = this.sizeOptions[this.generateRandom(Object.keys(this.sizeOptions).length)].value;
      const randomQuantity = this.generateRandom(this.productLimit) + 1;
      const newProduct = {
        ...product,
        quantity: randomQuantity,
        totalPrice: randomQuantity * product.price,
        size: randomSize,
        testing: true
      };
      this.handleAddToCart(newProduct);
      cartItemsInserted++;
    }
    // this.setState({ cart: newCart });
    // debugger;
  }

  getProducts() {
    //use this url for localhost. May need to use a different url in production
    // axios.defaults.baseURL = "/";
    const url = "/product_data.json";
    return axios.get(url).then(response => {
      this.products = response.data.productData;
      this.sizeOptions = response.data.sizeOptions;
      //attach links to products
      this.products.map(
        product => (product.link = `/shop/${product.category}/${product.brand}/${product.name}/${product.color}`)
      );
      const categories = [...new Set(this.products.map(product => product.category))];
      categories.map(
        category =>
          (this.categorizedProducts[category] = this.products.filter(product => product.category === category))
      );

      this.insertRandomCartItems(5);

      this.setState({
        loading: false
      });
    });
  }

  componentWillMount() {}

  componentDidMount() {
    this.getProducts();
  }

  componentDidUpdate() {}

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

  handleAddToCart = product => {
    // e.preventDefault();
    if (!product.size) {
      return;
    }
    if (this.state.totalCartItems > 0) {
      this.setState({ shouldBounce: true }, () => {
        setTimeout(() => this.setState({ shouldBounce: false }), 400);
      });
    }
    //if id of productpage matches any id in shopping cart, increase quantity by 1,
    // else add the item as a new item
    const index = this.state.cart.findIndex(cartItem => {
      return cartItem.size === product.size && cartItem.id === product.id;
    });
    // console.log(product.size);
    // console.log(index);
    //checks if we've already purchased the product in a certain size

    if (index > -1) {
      const productClone = { ...this.state.cart[index] };
      if (productClone.quantity === this.productLimit) return;
      productClone.quantity++;
      productClone.totalPrice = productClone.quantity * productClone.price;
      const cartClone = [...this.state.cart];
      cartClone[index] = productClone;
      this.setState(prevState => ({
        cart: cartClone,
        totalCartItems: prevState.totalCartItems + 1,
        subTotal: prevState.subTotal + productClone.price
      }));
      //Add the new product
    } else {
      if (!product.testing) {
        product.quantity = 1;
        product.totalPrice = product.price;
      }
      this.setState(prevState => ({
        cart: [...this.state.cart, product],
        totalCartItems: prevState.totalCartItems + product.quantity,
        subTotal: prevState.subTotal + (product.testing ? product.totalPrice : product.price) //use totalPrice here for inserting cart items manually
      }));
    }
  };

  handleRemoveItem = product => {
    const { id, size, quantity, totalPrice } = product;
    const cartClone = this.state.cart.filter(cartItem => cartItem.id !== id || cartItem.size !== size);

    this.setState(
      prevState => ({
        cart: cartClone,
        totalCartItems: prevState.totalCartItems - quantity,
        subTotal: prevState.subTotal - totalPrice
      }),
      function() {
      }
    );
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

  render() {
    if (this.state.loading) return <div>Loading sir</div>;
    const { cart, totalCartItems, subTotal, shouldBounce } = this.state;
    let cartLink = totalCartItems ? totalCartItems + " item" : undefined;
    if (totalCartItems > 1) cartLink += "s";

    this.updateTotal();
    return (
      <React.Fragment>
        <NavItems>
          <NavItem to="/">home</NavItem>
          <NavItem to="/shop">shop</NavItem>
          <NavItem to="/cart">
            <CountContainer notEmpty={cartLink} shouldBounce={shouldBounce} totalCartItems={totalCartItems}>
              <Icon.ShoppingBag />
              <span>{cartLink}</span>
            </CountContainer>
          </NavItem>
        </NavItems>
        <Switch>
          <RouteWithProps path="/shop/:category?/:brand?" exact products={this.categorizedProducts} component={Shop} />
          <RouteWithProps
            path="/shop/:category/:brand/:name/:color"
            exact
            products={this.categorizedProducts}
            cart={this.state.cart}
            sizeOptions={this.sizeOptions}
            addToCart={this.handleAddToCart}
            productLimit={this.productLimit}
            component={ProductPage}
          />

          {/* <RouteWithProps path="/shop/Tees/:brand" exact items={this.state.products} component={FilterItems} /> */}
          <RouteWithProps
            path="/cart"
            exact
            cart={this.state.cart}
            orderData={this.handleGetOrderData()}
            removeItem={this.handleRemoveItem}
            userOptions
            updateQuantity={this.handleUpdateQuantity}
            component={ShoppingCart}
          />

          <RouteWithProps
            path="/checkout"
            clearCart={this.handleClearCart}
            getOrderData={this.handleGetOrderData}
            orderData={this.handleGetOrderData()}
            exact
            cart={cart}
            component={Checkout}
          />
          <RouteWithProps path="/checkout/order-summary" exact component={OrderSummary} />

          <Route path="/" exact render={() => <StoreFront products={this.state.products} />} />
          <Redirect to="/" />
        </Switch>
      </React.Fragment>
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
  /* grid-template-rows:auto; */
  grid-template-columns:
    minmax(4rem,1fr) [full-start] repeat(8, [col-start] minmax(min-content, 30rem) [col-end])
    [full-end] minmax(4rem, 1fr);
  justify-content: center;
  /* border-top: 2.5px solid ${theme.primary_dark}; */
  /* background-color: ${theme.white}; */
`;

const CountContainer = styled.div`
  position: relative;

  & * {
    transition: transform 0.4s ease-in;
  }
  & svg {
    stroke-width: 1.5;
    /* transition: translation-duration .3s ease-in; */
    /* transition-duration: .3s; */
    font-weight: 300;
    transform: ${props => props.notEmpty && `translateX(-1rem)`};
    animation: ${props => props.shouldBounce && `bounce .5s`};
  }
  & span {
    position: absolute;
    /* display: inline-block; */
    margin-left: -0.5rem;
    white-space: nowrap;
    animation: ${props => props.notEmpty && `color-me-in 0.4s cubic-bezier(1,.01,1,1)`};
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
      transform: translate(-1rem, 0);
    }
    50% {
      transform: translate(-1rem, -0.6rem);
    }
    100% {
      transform: translate(-1rem, 0);
    }
  }
`;
