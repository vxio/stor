import React from "react";
import { configure, mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import sinon from 'sinon';
import { Store } from "./Store";
import ShoppingCart from './ShoppingCart';
import productData from '../../public/product_data.json';
import axios from 'axios';

import ProductPage from "./ProductPage";

configure({ adapter: new Adapter() });

describe("ProductPage", () => {
    let props;
    let mountedProductPage;
    // const store = mount(<Store />)
    // console.log(store);
    
    const productPage = () => {
        if (!mountedProductPage) {
            mountedProductPage = mount(<ProductPage {...props} />);
        }
        return mountedProductPage;
    };
    
    beforeEach(() => {

        props = {
            products: undefined,
            cart: undefined,
            sizeOptions: undefined,
            addToCart: undefined,
            changeSize: undefined,
            productLimit: undefined
        };
    mountedProductPage = undefined;
  });

  

//   it('calls componentDidMount', () => {
//     sinon.spy(Store.prototype, 'componentDidMount');
//     const wrapper = mount(<ShoppingCart />);
//     expect(Store.prototype.componentDidMount.calledOnce).to.equal(true);
//   });

it("ensures the state is set", () => {
  const promise = Promise.resolve(productData);
  sinon.stub(global, "fetch").callsFake(() => promise) ;

  const wrapper = shallow(<Store />);
  console.log(wrapper);

  return promise
    .then(() => {
      wrapper.update();
    })
});


  // All tests will go here
});
