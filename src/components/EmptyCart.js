import React from 'react'
import styled from 'styled-components'
import {media} from '../theme'
import Icon from "./GeneralUI/Icon";
import { ICONS } from "./GeneralUI/constants";
import LinkWithHoverEffect from "./LinkWithHoverEffect";

const EmptyCart = props => {
  return (
    <EmptyCartStyles>
      <Icon className="cart-svg" icon={ICONS.EMPTY_CART} size={140} />
      <div className="text">
        <h1>Your cart is empty!</h1>
        <LinkWithHoverEffect id="linkToShop" to="/shop" size={18}>
          Continue shopping
        </LinkWithHoverEffect>
      </div>
    </EmptyCartStyles>
  );
};

export default EmptyCart;

const EmptyCartStyles = styled.div`
  grid-column: 1 / -1;
  margin: 2rem auto;
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  ${media.phone`
    grid-auto-flow: row;
  `};

  .cart-svg {
    display: inline-block;
    ${media.phone`
      grid-row: 2/3;
    `};
  }

  #linkToShop {
    margin-left: 0.2rem;
    margin-right: auto;
  }

  .text {
    margin-left: 6rem;
    display: flex;
    flex-direction: column;
    ${media.phone`
      margin: 0 0 7rem;
    `};

    h1 {
      font-size: 5rem;
      margin-bottom: 2rem;
      ${media.phone`
        font-size: 4rem;
      `};
    }
  }
`;
