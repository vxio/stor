import React from "react";
import styled from "styled-components";
import { Route, Redirect, withRouter, Link } from "react-router-dom";
import ProductPage from "components/ProductPage/ProductPage";

const ProductCard = props => {
  console.log(props);
  const product = props.product;
  return (
    <Link to={`/store/${product.name}`}>
      <StyledProductCard>
        <img src={product.img} alt={product.img} />
        <figcaption>{product.name}</figcaption>
      </StyledProductCard>
    </Link>
  );
};

const StyledProductCard = styled.figure`
  margin-bottom: 2rem;
  position: relative;
  /* onload animation */
  /* opacity: ${props => (props.x ? 1 : 0)}; */
  /* transform: translateX(${props => (props.x ? 0 : -2)}rem); */
  transition: all 0.6s ease-in-out;

  img {
      max-width: 100%;
  }

  figcaption {
      font-size: 3rem;
  }
`;

export default withRouter(ProductCard);
