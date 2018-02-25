import React from "react";
import { configure, mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router-dom";
import sinon from "sinon";
import { Store } from "./Store";
import ShoppingCart from "./ShoppingCart";
import productData from "../../public/product_data.json";
import axios from "axios";

import ProductPage from "./ProductPage";

configure({ adapter: new Adapter() });

//set baseURL for development
axios.defaults.baseURL = "http://localhost:3000";

describe("ProductPage", () => {
  let props;
  let product;
  const storeInstance = shallow(<Store />).instance();
  let categorizedProducts;
  let wrapper;

  const productPage = () => {
    return shallow(<ProductPage {...props} />);
  };

  beforeAll(() => {
    return storeInstance.getProducts().then(result => {
      categorizedProducts = storeInstance.categorizedProducts;
      product = storeInstance.generateRandomProduct();
    });
  });

  beforeEach(() => {
    const { name, brand, color, category, id, link } = product;

    props = {
      products: categorizedProducts,
      cart: [],
      sizeOptions: undefined,
      addToCart: undefined,
      productLimit: undefined,
      match: { params: { name: name, brand: brand, color: color, category: category, id: id } },
      location: { pathname: link }
    };

    wrapper = undefined;
  });

  it("should render all colors options for the product", () => {
    const wrapper = productPage();
    const expected = wrapper.instance().sameProducts.length;
    const colorElements = wrapper.find("Color");
    const actual = colorElements.length;
    expect(expected).toEqual(actual);
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
