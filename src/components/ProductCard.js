import React from "react";
import styled from "styled-components";
import theme from "../theme";
import { Link } from "react-router-dom";

//used for homepage and store page
const ProductCard = props => {
  const { product, displayText } = props;

  let classes = [];
  if(!displayText) {
    classes.push('hover-effects');
  }

  return (
    <Container {...{ displayText }}>
      <Link to={`/shop/${product.name}`}>
        <img src={product.img} alt={product.img} />
        <ProductDetail className={classes.join(' ')}>
          <p>{product.name}</p>
          <p>${product.price}</p>
        </ProductDetail>
      </Link>
    </Container>
  );
};

const Container = styled.figure`
   /* margin-bottom: 2rem; */

  /* onload animation */
  /* opacity: ${props => (props.x ? 1 : 0)}; */
  /* transform: translateX(${props => (props.x ? 0 : -2)}rem); */
  /* transition: all 0.6s ease-in-out; */
  img {
      max-width: 100%;
  }

  .hover-effects {
    transition: all .3s ease-out;
    transform: translateY(1.5rem);
    opacity: 0;
  }

  &:hover .hover-effects {
    transform: none;
    opacity: 1;
  }
`;

const ProductDetail = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${theme.baseFontSize};

/* 
  ${props => !props.displayText * 1 && `p`} {
    color: red;
  } */


`;

// const NoHover = styled.div`
//   position: relative;
// `;

// const Hover = NoHover.extend`
//   &:hover {
//     border: 1px solid red;
//   }
//   .product-detail {
//     /* color: black; */
//     /* padding: 0 10px 0 0; */
//     /* width: 50%; */
//     /* border-right: 1px solid #fff; */
//     /* text-align: right; */
//     /* opacity: 0; */
//     /* transition: opacity 0.35s, transform 0.35s; */
//     transform: translateX(-1rem);
//   }
// `;

export default ProductCard;
