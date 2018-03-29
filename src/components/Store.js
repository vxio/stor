import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import styled from "styled-components";
// import theme from "../theme";
import { Link, NavItems } from "./NavItems";
import StoreFront from "./StoreFront";
import Shop from "./Shop";
import ProductPage from "./ProductPage";
import ShoppingCart from "./ShoppingCart";
import Checkout from "./Checkout";
import OrderConfirmation from "./OrderConfirmation";
import axios from "axios";
import * as Icon from "react-feather";
import LoadingScreen from "./GeneralUI/LoadingScreen";
import { generateRandom, formatter, RouteWithProps } from "./Utility";

export class Store extends Component {
  constructor(props) {
    super(props);
    const userData = !localStorage.isMock && JSON.parse(localStorage.getItem("locallyStoredUserData"));
    this.state = {
      loading: true,
      totalCartItems: (userData && userData.totalCartItems) || 0,
      cart: (userData && userData.cart) || [],
      shouldBounce: false,
      subTotal: (userData && userData.subTotal) || 0,
      customerInfo: (userData && userData.customerInfo) || undefined
    };
    this.products = null;
    this.categorizedProducts = {};
    this.sizeOptions = {};
    this.total = 0;
    this.orderData = null;

    /*constants*/
    this.shipping = 10;
    this.taxRate = 0.1;
    this.tax = 0;
    this.productLimit = 10;

  }

  getProductsFromDatabase() {
    axios.defaults.baseURL = process.env.PUBLIC_URL;
    console.log(process.env.PUBLIC_URL);
    const url = "/product_data.json";
    return axios.get(url).then(response => {
      this.products = response.data.productData;
      this.sizeOptions = response.data.sizeOptions;
      //attach links to products
      this.products.forEach(
        product => {
          product.link = `/shop/${product.category}/${product.brand}/${product.name}/${product.color}`
          product.img = `/${product.img}`
          console.log(product.img)
        }
      )
      
      const categories = [...new Set(this.products.map(product => product.category))];
      categories.map(
        category =>
          (this.categorizedProducts[category] = this.products.filter(product => product.category === category))
      );
      this.setState({
        loading: false
      });
    });
  }

  componentWillMount() {
    //stops browser (Google Chrome) from scrolling back down the page on refresh
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }

  componentDidMount() {
    this.getProductsFromDatabase().then(() => {
      // this.insertDataForDevelopment(); //used for testing in development
    });
  }

  componentDidUpdate(prevProps) {
    const { pathname } = this.props.location;
    const pathnameArray = pathname.split("/");
    const notOnProductPage = !(pathnameArray[1] === "shop" && pathnameArray[4]); //stops window from scrolling to top when user clicks between color options

    if (pathname !== prevProps.location.pathname && notOnProductPage) {
      window.scrollTo(0, 0);
    }
    //persist data through local storage
    const { cart, totalCartItems, subTotal, customerInfo } = this.state;
    const locallyStoredUserData = { cart, totalCartItems, subTotal, customerInfo };
    localStorage.setItem("locallyStoredUserData", JSON.stringify(locallyStoredUserData));
  }

  handleAddToCart = (product, callback) => {
    const { cart, totalCartItems } = this.state;

    //bounce animation
    if (totalCartItems > 0) {
      let animationName = `animation${totalCartItems}`;
      this.setState({ shouldBounce: animationName });
    }
    // else add the item as a new item
    const index = cart.findIndex(cartItem => {
      return cartItem.size === product.size && cartItem.id === product.id;
    });
    //checks if we've already purchased the product in a certain size

    //if product (id and size) is already in cart, increase quantity of product in cart by 1
    if (index > -1) {
      const productClone = { ...cart[index] };
      if (productClone.quantity === this.productLimit) return;
      productClone.quantity++;
      productClone.totalPrice = productClone.quantity * productClone.price;
      const cartClone = [...cart];
      cartClone[index] = productClone;
      this.setState(
        prevState => ({
          cart: cartClone,
          totalCartItems: prevState.totalCartItems + 1,
          subTotal: prevState.subTotal + productClone.price
        }),
        callback
      );
      //Add the new product
    } else {
      if (!product.testing) {
        //used for testing in development
        product.quantity = 1;
        product.totalPrice = product.price;
      }
      this.setState(
        prevState => ({
          cart: [...cart, product],
          totalCartItems: prevState.totalCartItems + product.quantity,
          subTotal: prevState.subTotal + (product.testing ? product.totalPrice : product.price) //using totalPrice here for inserting cart items manually
        }),
        callback
      );
    }
  };

  handleRemoveCartItem = product => {
    const { id, size, quantity, totalPrice } = product;
    const cartClone = this.state.cart.filter(cartItem => cartItem.id !== id || cartItem.size !== size);

    this.setState(prevState => ({
      cart: cartClone,
      totalCartItems: prevState.totalCartItems - quantity,
      subTotal: prevState.subTotal - totalPrice
    }));
  };

  handleClearCart = () => {
    this.setState({
      totalCartItems: 0,
      cart: [],
      subTotal: 0
    });
  };

  handleUpdateQuantity = (e, product) => {
    const newQuantity = +e.target.value;
    const difference = newQuantity - product.quantity;
    const cartClone = [...this.state.cart];
    //need to get index here because of async React Motion transitions
    const index = cartClone.findIndex(cartItem => cartItem.id === product.id && cartItem.size === product.size);
    const productClone = { ...product, quantity: newQuantity, totalPrice: newQuantity * product.price };
    cartClone[index] = productClone;
    this.setState(prevState => {
      return {
        cart: cartClone,
        totalCartItems: prevState.totalCartItems + difference,
        subTotal: prevState.subTotal + difference * product.price
      };
    });
  };

  updateCartTotal() {
    this.tax = +(this.state.subTotal * this.taxRate).toFixed(2);
    this.total = +(this.state.subTotal + this.tax + this.shipping).toFixed(2);
    //checks if cart is empty
    if (this.state.cart.length === 0) {
      this.total = 0;
    }
  }

  handleGetOrderData = () => {
    const { totalCartItems, subTotal } = this.state;
    const { shipping, tax, total } = this;
    const orderInfo = {
      totalCartItems,
      subTotal: formatter.format(subTotal),
      shipping: formatter.format(shipping),
      tax: formatter.format(tax),
      total: formatter.format(total)
    };
    return orderInfo;
  };

  handleOnSubmit = values => {
    this.setState({ customerInfo: values }, () => {
      this.props.history.push("/checkout/review-and-order");
    });
  };

  /*** functions used for testing in development ***/
  generateRandomProduct() {
    const product_keys = Object.keys(this.categorizedProducts);
    const randomCategory = this.categorizedProducts[product_keys[generateRandom(product_keys.length)]]; //array of products
    const randomProduct = randomCategory[generateRandom(randomCategory.length)];
    return randomProduct;
  }

  insertRandomCartItems(numberOfCartItems) {
    let cartItemsInserted = 0;
    while (cartItemsInserted < numberOfCartItems) {
      const product = this.generateRandomProduct();
      const randomSize = this.sizeOptions[generateRandom(Object.keys(this.sizeOptions).length)].value;
      const randomQuantity = generateRandom(this.productLimit) + 1;
      const newProduct = {
        ...product,
        quantity: randomQuantity,
        totalPrice: randomQuantity * product.price,
        size: randomSize,
        testing: true //set to true if product inserted is used only for testing development
      };
      this.handleAddToCart(newProduct);
      cartItemsInserted++;
    }
  }

  insertSpecificCartItem(id, size, quantity) {
    const specificProduct = this.products.find(product => product.id === id);
    const newProduct = {
      ...specificProduct,
      quantity: quantity,
      totalPrice: quantity * specificProduct.price,
      size: size,
      testing: true
    };
    this.handleAddToCart(newProduct);
  }

  insertDataForDevelopment() {
    this.insertSpecificCartItem(1, "medium", 9);
    this.insertSpecificCartItem(1, "small", 8);
    this.insertRandomCartItems(5);
    // const customerInfo = {
    //   main: {
    //     firstName: "Vincent",
    //     lastName: "Xiao",
    //     email: "vince@gmail.com"
    //   },
    //   billing: {
    //     street: "555 Ace Street",
    //     city: "West Covina",
    //     state: "California",
    //     zipcode: "99923"
    //   },
    //   shipping: {
    //     street: "555 Ace Street",
    //     city: "West Covina",
    //     state: "California",
    //     zipcode: "99923"
    //   }
    // };
    // this.setState({ customerInfo });
  }

  render() {
    const { cart, totalCartItems,  shouldBounce, customerInfo, loading } = this.state;
    if (loading) {
      return <LoadingScreen />;
    }
    let cartLink = totalCartItems ? totalCartItems + " item" : undefined;
    if (totalCartItems > 1) cartLink += "s";

    if (cart.length) {
      this.updateCartTotal();
      this.orderData = this.handleGetOrderData();
    }

    return (
      <React.Fragment>
        <NavItems>
          <Link to="/">home</Link>
          <Link to="/shop">shop</Link>
          <Link to="/cart">
            <CountContainer notEmpty={cartLink} shouldBounce={shouldBounce} totalCartItems={totalCartItems}>
              <Icon.ShoppingBag />
              <span>{cartLink}</span>
            </CountContainer>
          </Link>
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

          <RouteWithProps
            path="/cart"
            exact
            cart={cart}
            orderData={this.orderData}
            removeItem={this.handleRemoveCartItem}
            userOptionsEnabled
            updateQuantity={this.handleUpdateQuantity}
            customerInfo={customerInfo}
            component={ShoppingCart}
          />
          <RouteWithProps
            path="/checkout/account-info"
            onSubmit={this.handleOnSubmit}
            customerInfo={customerInfo}
            exact
            isCartEmpty={!cart.length}
            component={Checkout}
          />

          <RouteWithProps
            path="/checkout/(review-and-order|order-confirmation)"
            customerInfo={customerInfo}
            orderData={this.orderData}
            cart={cart}
            removeItem={this.handleRemoveCartItem}
            updateQuantity={this.handleUpdateQuantity}
            clearCart={this.handleClearCart}
            exact
            component={OrderConfirmation}
          />

          <Route path="/" exact render={() => <StoreFront products={this.state.products} />} />
          {/* <Redirect to="/" /> */}
        </Switch>
      </React.Fragment>
    );
  }
}

export default withRouter(Store);

const CountContainer = styled.div`
  position: relative;

  & * {
    transition: transform 0.4s ease-in;
  }
  & svg {
    stroke-width: 1.5;
    font-weight: 300;
    transform: ${props => props.notEmpty && `translateX(-1rem)`};
    animation: ${props => `${props.shouldBounce} .5s`};
  }
  & span {
    position: absolute;
    margin-left: -0.5rem;
    white-space: nowrap;
    animation: ${props => props.notEmpty && `fadeIn 0.4s cubic-bezier(1,.01,1,1)`};
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes ${props => props.shouldBounce} {
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
