import React from "react";
import styled from "styled-components";
import theme, { media } from "../theme";
import { Link, withRouter } from "react-router-dom";

//used for homepage and store page
const ProductCard = props => {
  const { product, displayText, match } = props;

  return (
    <Container {...{ displayText }}>
      <Link to={product.link}>
        <div className="overlay">
          <img src={product.img} alt={product.img} />
        </div>

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
  &:hover {
    .overlay:after {
      opacity: 1;
    }
  }

  .overlay {
    position: relative;
    &:after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.08);
      border-radius: 2px;
      opacity: 0;
      transition: all 0.2s ease-out;
    }

    img {
      width: 100%;
      display: block;
      padding: 2rem 1rem;
      margin: auto;
    }
  }

  &:hover {
    /* box-shadow: 2px 8px 20px 0 rgba(31, 32, 68, 0.25); */
  }
`;

const ProductDetail = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
  margin: 0.5rem 0 0;

  ${media.tabletExtraSmall`font-size:2.4rem;`} div {
    p:first-child {
      /*name and brand*/
      /* transition: all .2s; */
      margin-bottom: 0.3rem;
      color: ${theme.black};
    }
    p:nth-child(2) {
      /*price and color */
      color: ${theme.grey_5};
    }
  }
  .name-brand {
  }

  .color-price {
    text-align: right;
  }
`;

export default withRouter(ProductCard);
