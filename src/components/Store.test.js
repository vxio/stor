import React from "react";
import { configure, mount, shallow, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import sinon from "sinon";
import { Store } from "./Store";
import productData from "../../public/product_data.json";
import axios from "axios";

configure({ adapter: new Adapter() });

/*** Test Ideas ***/
/*
*/

//set baseURL for development
axios.defaults.baseURL = "http://localhost:3000";

describe("Store", () => {
  let wrapper;
  let wrapperInstance;
  let categorizedProducts;
  let size = "large";
  let products = [];
  let product;

  function destructureProduct(product) {
    const { name, brand, color, category, id, link } = product;
    return {
      match: { params: { name: name, brand: brand, color: color, category: category, id: id } },
      location: { pathname: link }
    };
  }

  beforeAll(() => {
    wrapperInstance = shallow(<Store />).instance();
    return wrapperInstance.getProducts().then(result => {
      categorizedProducts = wrapperInstance.categorizedProducts;
    });
  });

  beforeEach(() => {
    products.push(wrapperInstance.generateRandomProduct());
    product = products[0];
    product.size = size;
    // const otherProps = destructureProduct(product);
    // props = {
    // };

    //reset
    wrapper = shallow(<Store />);
    wrapperInstance = wrapper.instance();
    //need to set categorizedProducts again after making new instance
    wrapperInstance.categorizedProducts = categorizedProducts;
  });

  //action done in 'beforeAll()
  it("should get products from sample database and stored in <Store />", () => {
    // console.log(wrapperInstance);
    expect(Object.keys(wrapperInstance.categorizedProducts).length).toBeGreaterThan(0);
  });

  //Add to cart
  //Case 1 - product being added is not in the cart
  it("should update cart and state of Store when product is added", () => {
    wrapperInstance.handleAddToCart(product);
    const cart = wrapperInstance.state.cart;
    expect(cart[0].id).toEqual(product.id);
  });
  //Case 2 - product being added is in the cart
  it("should update product quantity in cart when product is added", () => {
    wrapperInstance.handleAddToCart(product);
    wrapperInstance.handleAddToCart(product);
    let cart = wrapperInstance.state.cart;
    expect(cart[0].quantity).toEqual(2);

    wrapperInstance.handleAddToCart(product);
    cart = wrapperInstance.state.cart;
    expect(cart[0].quantity).toEqual(3);
  });

  //size specificity
  it("should add a new product to the cart if the product in the cart is a different size", () => {
    product.size = "large";
    wrapperInstance.handleAddToCart(product);
    const newProduct = { ...product, size: "small" };
    wrapperInstance.handleAddToCart(newProduct);

    let cart = wrapperInstance.state.cart;
    expect(cart.filter(cartItem => cartItem.id === product.id).length).toEqual(2);
  });

  it("should remove the item with the corresponding size", () => {
    wrapperInstance.handleAddToCart(product);
    const newProduct_1 = { ...wrapperInstance.generateRandomProduct(), size: "medium" };
    const newProduct_2 = { ...wrapperInstance.generateRandomProduct(), size: "large" };
    const productToBeRemoved = { ...newProduct_2, size: "small" };
    const productId = productToBeRemoved.id;
    wrapperInstance.handleAddToCart(newProduct_1);
    wrapperInstance.handleAddToCart(newProduct_2);
    wrapperInstance.handleAddToCart(productToBeRemoved);
    wrapperInstance.handleRemoveItem(productToBeRemoved);
    let cart = wrapperInstance.state.cart;
    expect(cart.length).toEqual(3);
    //size should be equal to newProduct_2's size
    expect(cart.find(cartItem => cartItem.id === productId).size).toEqual("large");
  });

  it("should update the quantity of the selected product", () => {
    wrapperInstance.handleAddToCart(product);
    const newProduct_1 = { ...wrapperInstance.generateRandomProduct(), size: "medium" };
    const newProduct_2 = { ...wrapperInstance.generateRandomProduct(), size: "large" };
    const productToUpdate = { ...newProduct_2, size: "small" };
    wrapperInstance.handleAddToCart(newProduct_1);
    wrapperInstance.handleAddToCart(newProduct_2);
    wrapperInstance.handleAddToCart(productToUpdate);
    const newQuantity = 5;
    const mockedEvent = {
      target: {
        value: newQuantity
      }
    };
    // productToUpdate index === 3
    wrapperInstance.handleUpdateQuantity(mockedEvent, productToUpdate);
    let cart = wrapperInstance.state.cart;
    expect(cart[3].quantity).toEqual(5);
    const expectedSubtotal =
      product.price + newProduct_1.price + newProduct_2.price + productToUpdate.price * newQuantity;
    const actualSubTotalSum = cart.reduce((acc, cartItem) => acc + cartItem.totalPrice, 0);

    expect(actualSubTotalSum).toEqual(expectedSubtotal);
  });

  it("should display the correct number of cart items in the navbar", () => {
    wrapperInstance.handleAddToCart(product);
    const newProduct_1 = { ...wrapperInstance.generateRandomProduct(), size: "medium" };
    const newProduct_2 = { ...wrapperInstance.generateRandomProduct(), size: "large" };
    const productToUpdate = { ...newProduct_2, size: "small" };
    wrapperInstance.handleAddToCart(newProduct_1);
    wrapperInstance.handleAddToCart(newProduct_2);
    wrapperInstance.handleAddToCart(productToUpdate);
    expect(wrapper.instance().state.totalCartItems).toEqual(4);

    const newQuantity = 5;
    const mockedEvent = {
      target: {
        value: newQuantity
      }
    };

    // productToUpdate index === 3
    wrapperInstance.handleUpdateQuantity(mockedEvent, productToUpdate);
    expect(wrapper.instance().state.totalCartItems).toEqual(8);
  });
});
