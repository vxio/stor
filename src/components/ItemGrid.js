import React, { Component } from "react";
import ProductCard from "./ProductCard";
import styled from "styled-components";

export default class ItemGrid extends Component {
  render() {
    let products = this.props.products.map((product, i) => <ProductCard key={i} product={product} />);
    // console.log(products);
    return <Grid>{products}</Grid>;
  }
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
`;
