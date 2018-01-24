import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

//used for homepage and store page
const ProductCard = props => {
  const {product} = props  
  console.log('card', product);
  return (
    <Link to={`/store/${product.name}`}>
      <StyledFigure>
        <img src={product.img} alt={product.img} />
        <figcaption>{product.name}</figcaption>
      </StyledFigure>
    </Link>
  );
};

const StyledFigure = styled.figure`
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

export default ProductCard
