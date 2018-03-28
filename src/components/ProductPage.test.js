import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Store } from "./Store";
import ShoppingCart from "./ShoppingCart";
import productData from "../../public/product_data.json";
import axios from "axios";
import { Form } from "react-final-form";
import { variables } from "../theme";
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
  let size = "medium";
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
    return storeInstance.getProductsFromDatabase().then(result => {
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
    const expected = wrapper.instance().sameProductsWithDifferentColors.length;
    const colorElements = wrapper.find("Color");
    const actual = colorElements.length;
    expect(actual).toEqual(expected);
  });

  it("should add the item to the shopping cart given the selected color and size", () => {
    product.size = size;
    wrapper.setState({ product: product, selectedSize: size });

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
    wrapper.setProps({ cart: storeInstance.state.cart });
    const wrapperInstance = wrapper.instance();
    wrapperInstance.isProductInCart();
    wrapper.update();
    formWrapper = getFormFromComponent(wrapper);
    const button = formWrapper.find("Button");
    expect(button.prop("disabled")).toEqual(true);
  });

  it("should show warning and no item added to cart if user submits without a selected size", () => {
    let formWrapper = getFormFromComponent(wrapper);
    const formElement = formWrapper.find("form");
    formElement.simulate("submit");
    formElement.simulate("submit");
    wrapper.update();
    formWrapper = getFormFromComponent(wrapper);
    console.log(formWrapper.debug());
    expect(formWrapper.find("#size-text").children().text()).toEqual(wrapper.instance().state.sizeLabel);
    expect(storeInstance.state.cart.length).toEqual(0);
  });

  it("should not show No Size Selected warning if user clicks on different color", () => {
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

    const otherProduct = wrapper.instance().sameProductsWithDifferentColors[1];
    otherProps = destructureProduct(otherProduct);
    props = {
      ...props,
      ...otherProps
    };
    wrapper.setProps({ ...props });
    expect(wrapper.instance().state.sizeLabel).toEqual("Select Size");
  });
});
