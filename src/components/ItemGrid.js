import React, { Component } from "react";
import ProductCard from "./ProductCard";
import styled from "styled-components";
import theme, {media} from '../theme';

class ItemGrid extends Component {
  state = {
    items: this.props.products
  }

  render() {
    const { position, items, displayText } = this.props;

    let productsArray = items.map((item, i) => (
        <ProductCard key={i} product={item} displayText={displayText} />
    ));

    return <Grid className={this.props.className} innerRef={this.saveRef}>{productsArray}</Grid>;
  }
}

const Grid = styled.div`
  grid-column: 2 / 4;
  justify-self: center;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 6rem;
  grid-row-gap: 7rem;

  ${media.tabletLarge`grid-template-columns: repeat(2,1fr); grid-column-gap: 5rem`}
  ${media.tabletExtraSmall`grid-template-columns: 1fr; grid-gap: 4rem`}

  & > * {
    transform: translateX(-3rem);
    /* border: 1px solid red; */
  }

  .is-showing {
    border: 1px solid red;
  }
`;

export default ItemGrid;
