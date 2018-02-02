import React from "react";
import ItemGrid from "./ItemGrid";
import styled from 'styled-components';

const Shop = props => {
  return (
    <Styles>
      <ItemGrid displayText products={props.products} />
    </Styles>
  );
};

export default Shop;

const Styles = styled.div`
    grid-column: center;
    /* margin: 0 auto; */
    justify-self: center;
`