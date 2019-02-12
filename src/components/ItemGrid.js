import React, { Component } from "react";
import ProductCard from "./ProductCard";
import styled from "styled-components";
import {media} from '../theme';
import PropTypes from 'prop-types';

class ItemGrid extends Component {
  state = {
    items: this.props.products
  }

  render() {
    const { items, displayText } = this.props;

    let productsArray = items.map((item, i) => (
        <ProductCard key={i} product={item} displayText={displayText} />
    ));

    return <Grid className={this.props.className} innerRef={this.saveRef}>{productsArray}</Grid>;
  }
}

export default ItemGrid;

ItemGrid.propTypes = {
  items: PropTypes.array.isRequired,
  displayText: PropTypes.bool
}

const Grid = styled.div`
  grid-column: 2 / 4;
  justify-self: center;
  display: grid;
  grid-template-columns: repeat(3, minmax(240px, 1fr));
  grid-column-gap: 6rem;
  grid-row-gap: 7rem;
  margin-bottom: 8rem;
  ${media.tabletLarge`
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  `}

  & > * {
    transform: translateX(-3rem);
  }

`;

