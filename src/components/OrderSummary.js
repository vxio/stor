import React from "react";
import styled from "styled-components";
import theme, { media } from "../theme";
import { Link } from "react-router-dom";
import Button from "./GeneralUI/Button";

const OrderSummary = props => {
  const { includeButtons, customerInfo } = props;
  const { subTotal, shipping, tax, total } = props.orderData;
  let linkToNextPage = "/checkout/account-info";
  if (customerInfo) {
    linkToNextPage = "/checkout/review-and-order";
  }
  return (
    <OrderSummaryContainer id={props.id}>
      <div className="header">
        <h2>Order Summary</h2>
      </div>

      <div>
        <PriceText name="Subtotal" price={subTotal} />
        <PriceText name="Shipping" price={shipping} />
        <PriceText name="Tax" price={tax} />
        <PriceText topBorder className="total" name="Total" price={total} />
      </div>
      {includeButtons && (
        <Link to={linkToNextPage} className="proceed-link">
          <Button large color="primary">
            Checkout
          </Button>
        </Link>
      )}
    </OrderSummaryContainer>
  );
};

export default OrderSummary;

const OrderSummaryContainer = styled.div`
  display:grid;
  grid-template-columns: 1fr minmax(18rem, max-content) 1fr;
  grid-template-rows: repeat(3, max-content);
  grid-row-gap: 3rem;
  font-size: ${theme.p_large};
  box-shadow: ${theme.boxShadow_border};
  margin-bottom: auto;
  width: 45rem;

  ${media.tabletLarge`
    width:35rem
  `};
  ${media.tabletSmall`
    width: 100%;
  `}
  
  & > * {
    grid-column: 2/3;
  }
  
  .header {
    grid-column: 1/ -1;
    border-top: 6px solid ${theme.primary};
    width: 100%;

    & > * {
      text-align: center;
      font-size: ${theme.h1_small};
      margin-top: 2.5rem;
      ${media.phone`
        font-size: ${theme.h1_extraSmall};
      `}
    }
  }

  .proceed-link {
    margin-bottom: 3rem;
  }
}
`;

const PriceText = props => {
  const { name, price, importantName, className } = props;

  return (
    <Styles importantName={importantName} className={className}>
      <span className="name">{name}</span>
      <span className="price">{price}</span>
    </Styles>
  );
};

const Styles = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  .name {
    display: inline-block;
    width: 7rem;
    color: ${theme.grey_7};
    text-align:right;
    margin-right: 2rem;
  }
  .price {
    letter-spacing: .03rem;
    margin-left: auto;
  }
`;
