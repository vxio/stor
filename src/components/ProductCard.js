import React from "react";
import styled from "styled-components";
import theme from "../theme";
import { Link, withRouter } from "react-router-dom";

//used for homepage and store page
const ProductCard = props => {
  const { product, displayText, match } = props;

  return (
    <Container {...{ displayText }}>
      <Link to={product.link}>
        <img src={product.img} alt={product.img} />
        <ProductDetail>
          <div className="name-brand">
            <p>{product.name}</p>
            <p>{product.brand}</p>
          </div>
          <div className="color-price">
            <p>${product.price}</p>
            <p>{product.color}</p>
          </div>
        </ProductDetail>
      </Link>
    </Container>
  );
};

const Container = styled.figure`
  img {
    max-width: 100%;
  }

`;

const ProductDetail = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
  margin: 1.3rem 1.7rem 0;

  div {
    p:first-child { /*name and brand*/
      margin-bottom: 0.3rem;
    }
    p:nth-child(2) { /*price and color */
      color: ${theme.grey_5};
    }
  }
   .name-brand {
  }

  .color-price {
    text-align: right;
`;

export default withRouter(ProductCard);
