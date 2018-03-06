import React from "react";
import { configure, mount, shallow, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter, StaticRouter, withRouter } from "react-router-dom";
import sinon from "sinon";
import { Store } from "./Store";
import ShoppingCart from "./ShoppingCart";
import productData from "../../public/product_data.json";
import axios from "axios";
import { Form } from "react-final-form";

import ProductPage from "./ProductPage";

configure({ adapter: new Adapter() });

/*** Test Ideas ***/
/*
- stay on selected size after switching colors


*/
//set baseURL for development
axios.defaults.baseURL = "http://localhost:3000";

describe("ProductPage", () => {
  let props;
  let product;
  let storeInstance;
  let categorizedProducts;
  let wrapper;
  let size = 'medium';
  const productPage = () => {
    return shallow(<ProductPage {...props} />);
  };

  const getStoreInstance = () => {
    return shallow(<Store />).instance();
  };

  const getFormFromComponent = wrapper => {
    return wrapper.find(Form).dive();
  };
  function destructureProduct(product) {
    const { name, brand, color, category, id, link } = product;
    return {
      match: { params: { name: name, brand: brand, color: color, category: category, id: id } },
      location: { pathname: link }
    };
  }

  beforeAll(() => {
    storeInstance = getStoreInstance();
    return storeInstance.getProducts().then(result => {
      categorizedProducts = storeInstance.categorizedProducts;
      product = storeInstance.generateRandomProduct();
    });
  });

  beforeEach(() => {
    storeInstance = getStoreInstance();
    storeInstance.categorizedProducts = categorizedProducts;
    product = storeInstance.generateRandomProduct();

    const otherProps = destructureProduct(product);

    props = {
      products: categorizedProducts,
      cart: [],
      sizeOptions: storeInstance.sizeOptions,
      addToCart: storeInstance.handleAddToCart,
      productLimit: storeInstance.productLimit,
      ...otherProps
    };

    //reset
    wrapper = productPage();
  });

  it("should render all colors options for the product", () => {
    const expected = wrapper.instance().sameProducts.length;
    const colorElements = wrapper.find("Color");
    const actual = colorElements.length;
    expect(actual).toEqual(expected);
  });

  it("should add the item to the shopping cart given the selected color and size", () => {
    product.size = size;
    wrapper.setState({ product: product, selectedSize: size });
    // wrapper.instance().props.addToCart(product);
    const button = wrapper
      .find(Form)
      .dive()
      .find("form")
      .simulate("submit");
    // 
  });

  it("should disable purchase button and display notification when the quantity limit is reached for the item and size", () => {
    product.size = size;
    wrapper.setState({ product: product, selectedSize: size });
    let formWrapper = getFormFromComponent(wrapper);
    const formElement = formWrapper.find("form");
    for (let i = 0; i < wrapper.instance().props.productLimit; i++) {
      formElement.simulate("submit");
    }
    //  //item in cart with quantity === 10
    wrapper.setProps({ cart: storeInstance.state.cart });
    const wrapperInstance = wrapper.instance();
    wrapperInstance.checkProductInCart();
    wrapperInstance.checkQuantityLimit();
    wrapper.update();
    //need to reset formWrapper after update()
    formWrapper = getFormFromComponent(wrapper);
    const button = formWrapper.find("button");
    expect(button.prop("disabled")).toEqual(true);
    // 
    expect(formWrapper.find("#limit-notification").exists()).toEqual(true);
    // expect(wrapperInstance.state.)
    // 
  });

  it("should show warning and no item added to cart if user submits without a selected size", () => {
    let formWrapper = getFormFromComponent(wrapper);
    const formElement = formWrapper.find("form");
    formElement.simulate("submit");
    formElement.simulate("submit");
    wrapper.update();
    formWrapper = getFormFromComponent(wrapper);
    expect(
      formWrapper
        .find("#size-text")
        .children()
        .text()
    ).toEqual(wrapper.instance().state.sizeText);
    expect(storeInstance.state.cart.length).toEqual(0);
  });

  it("should not show size No Size Selected warning if user clicks on different color", () => {
    const product = storeInstance.categorizedProducts.Tees[0]; //should be the black Arch Logo Tee and have other color options

    let otherProps = destructureProduct(product);
    props = {
      ...props,
      ...otherProps
    };
    wrapper = productPage();
    let formWrapper = getFormFromComponent(wrapper);
    const formElement = formWrapper.find("form");
    formElement.simulate("submit");
    formElement.simulate("submit");
    wrapper.update();
    formWrapper = getFormFromComponent(wrapper);
    expect(
      formWrapper
        .find("#size-text")
        .children()
        .text()
    ).toEqual(wrapper.instance().state.sizeText);

    const otherProduct = wrapper.instance().sameProducts[1];
    otherProps = destructureProduct(otherProduct);
    props = {
      ...props,
      ...otherProps
    };
    wrapper.setProps({ ...props });
    formWrapper = getFormFromComponent(wrapper);
    
    expect(
      formWrapper
        .find("#size-text")
        .children()
        .exists()
    ).toEqual(false);
  });

  //use this method to test 'Shop' page
  // it("renders an image", () => {
  //   const wrapper = productPage();
  //   // wrapper.setState({ product: { ...product, img: "xx.png" } }, () => {
  //     wrapper.find('img').prop('onError')();
  //     wrapper.update();
  //     expect(false).toEqual(wrapper.instance().state.imageError);
  //   // });
  // });

  // it("color options render the correct link", () => {
  //   const divs = productPage().find('StyledColor');
  //   expect(divs.length).toEqual(productPage().instance().sameProducts.length)
  // });

  // All tests will go here
});
