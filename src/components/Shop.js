import React from "react";
import ItemGrid from "./ItemGrid";
import styled from "styled-components";
import { NavItems, NavItem } from "./NavItems";

const Shop = props => {
  const { products, match } = props;
  console.log(props);
  let productsDisplayed = products;

  //get unique names and sorts them from a to z
  const filteredBrands = [...new Set(products.map(product => product.brand))].sort((a, b) => a > b);

  console.log(filteredBrands);
  const brandNavItems = filteredBrands.map(brand => (
    <NavItem key={brand} to={match.path.split(":")[0] + brand.toLowerCase()}>{brand}</NavItem>
  ));
  if (match.params.brand) {
    productsDisplayed = products.filter(product => product.brand.toLowerCase() === match.params.brand);
    console.log('running filter');
  }
  return (
    <Styles>
      <NavItems>{brandNavItems}</NavItems>
      {/* <pre>{ JSON.stringify(products,0,2) }</pre> */}
      {console.log('rerendering')}
      <ItemGrid displayText items={productsDisplayed} />
    </Styles>
  );
};

export default Shop;

const Styles = styled.div`
  grid-column: center;
  /* margin: 0 auto; */
  justify-self: center;
`;
