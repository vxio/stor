import React, { Component} from "react";
import styled from "styled-components";
import theme, { Grid, media } from "../theme";
import WarningText from "./WarningText";
import { Form} from "react-final-form";
import { NavLink } from "react-router-dom";
import Icon from "./GeneralUI/Icon";
import { ICONS } from "./GeneralUI/constants";
import Button from "./GeneralUI/Button";
import RadioInputs from "./GeneralUI/RadioInputs";
import PropTypes from 'prop-types';

class ProductPage extends Component {
  constructor(props) {
    super(props);
    const { products, match, productLimit, sizeOptions } = props;

    this.sameProductsWithDifferentColors = products[match.params.category].filter(
      product => match.params.name === product.name && match.params.brand === product.brand
    );

    Object.assign(this, { productLimit, sizeOptions });
    this.purchasedNotification = "Added to cart!";
    this.limitReachedNotification = "Quantity limit reached!";
    this.notificationTimer = 1000;
    this.timeoutId = null;

    this.state = {
      sizeLabel: "Select Size",
      cartNotificationText: "",
      quantityLimitReached: false,
      product: this.getProductFromUrlParams(match.params.color),
      productInCart: undefined,
      selectedSize: undefined,
      imageError: false,
      clickedSubmit: false
    };
  }

  getProductFromUrlParams(color) {
    const product = this.sameProductsWithDifferentColors.filter(product => color === product.color)[0];
    return product;
  }

  isProductInCart() {
    const { cart } = this.props;
    const { product } = this.state;
    const productInCart = cart.find(cartProduct => {
      return cartProduct.id === product.id && cartProduct.size === product.size;
    });

    if (productInCart) {
      this.setState({ productInCart }, () => {
        this.isQuantityLimitReached();
      });
      return true;
    } else {
      this.setState({ productInCart: null });
      this.clearQuantityLimit();
      return false;
    }
  }

  clearQuantityLimit() {
    //if quantity is not reached, reset state
    this.setState({
      quantityLimitReached: false,
      sizeLabel: "Select Size"
    });
  }

  isQuantityLimitReached() {
    const { productInCart } = this.state;
    if (productInCart.quantity === this.productLimit) {
      this.setState({
        quantityLimitReached: true
      });
    } else {
      this.clearQuantityLimit();
    }
  }

  handleSizeInputChange = eventValue => {
    const { product } = this.state;
    clearTimeout(this.timeoutId);
    const selectedProduct = { ...product, size: eventValue };
    this.setState(
      {
        product: selectedProduct,
        selectedSize: eventValue,
        sizeLabel: eventValue,
        cartNotificationText: "",
        clickedSubmit: false
      },
      function() {
        this.isProductInCart();
      }
    );
  };

  onSubmit = values => {
    const { product, productInCart } = this.state;
    if (!product.size) {
      this.setState({
        sizeLabel: "Select size",
        clickedSubmit: true
      });
      return;
    }

    this.props.addToCart(product, () => {
      const limitReached = productInCart && productInCart.quantity >= this.productLimit - 1;
      this.setState({ cartNotificationText: this.purchasedNotification }, function() {
        this.timeoutId = setTimeout(
          () =>
            this.setState({
              cartNotificationText: "",
              quantityLimitReached: limitReached,
              clickedSubmit: true
            }),
          this.notificationTimer
        );
      });

      if (!productInCart) {
        this.isProductInCart();
      } else {
        const updatedProductInCart = { ...productInCart };
        updatedProductInCart.quantity++;
        this.setState({ productInCart: updatedProductInCart });
      }
    });
  };

  handleImageError = () => {
    throw new Error("image source not found");
    // this.setState({ imageError: true });
  };

  componentWillMount() {
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.color !== nextProps.match.params.color) {
      this.setState(
        {
          product: { ...this.getProductFromUrlParams(nextProps.match.params.color), size: this.state.selectedSize },
          clickedSubmit: false
        },
        function() {
          this.isProductInCart();
        }
      );
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  render() {
    const {
      quantityLimitReached,
      sizeLabel,
      cartNotificationText,
      product,
      selectedSize,
      clickedSubmit
    } = this.state;
    const { pathname } = this.props.location;
    const { params } = this.props.match;

    const colorOptions = this.sameProductsWithDifferentColors.map(product => (
      <StyledColor key={product.color} to={pathname.replace(params.color, product.color)} replace>
        <Color colorCode={product.colorCode} />
      </StyledColor>
    ));

    //used for selecting in test
    Form.displayName = "Form";

    const isButtonDisabled = quantityLimitReached || cartNotificationText;

    return <Grid>
        <Styled>
          <img className="image" onError={this.handleImageError} src={product.img} alt={product.img} />
          <div className="product-info">
            <div>
              <h2 className="name">{product.name}</h2>
              <h2 className="brand">{product.brand}</h2>
            </div>
            <h3 className="price">${product.price}</h3>
            {/* List of links to all colors available for this product
          User can quickly compare colors if more than one color is available */}
            <div>
              <h3 className="color-size-text">
                <strong>Color:</strong> {product.color}
              </h3>
              {colorOptions}
            </div>
            <Form onSubmit={this.onSubmit} render={({ handleSubmit, reset, submitting, pristine, values }) => {
                return <form onSubmit={handleSubmit}>
                    <WarningText id="size-text" className="color-size-text" warn={!selectedSize && clickedSubmit} showUserInput={selectedSize}>
                      {selectedSize ? <span>
                          <strong>Size: </strong>
                          {selectedSize}
                        </span> : <strong>{sizeLabel}</strong>}
                    </WarningText>
                    <RadioInputs name="size" options={this.sizeOptions} customOnChange={this.handleSizeInputChange} error={!selectedSize && clickedSubmit} />
                    <Button color={(quantityLimitReached && "disabled") || (isButtonDisabled && "primary") || "black"} type="submit" disabled={isButtonDisabled} width="25rem">
                      {cartNotificationText || (quantityLimitReached && this.limitReachedNotification) || "Add to Cart"}
                    </Button>
                  </form>;
              }} />
            <div className="details-container">
              <div className="detail">
                <span>
                  <Icon icon={ICONS.THREAD_WHEEL} size={19} />
                </span>
                <p>Made in Kurashiki, Okayama</p>
              </div>
              <div className="detail">
                <span>
                  <Icon icon={ICONS.WASHING_MACHINE} />
                </span>
                <p>Machine washable</p>
              </div>
            </div>
          </div>
        </Styled>
      </Grid>;
  }
}

export default ProductPage;

ProductPage.propTypes = {
  products: PropTypes.object.isRequired,
  cart: PropTypes.array.isRequired,
  sizeOptions: PropTypes.array.isRequired,
  addToCart: PropTypes.func.isRequired,
  productLimit: PropTypes.number.isRequired
}

const Styled = styled.div`
  grid-column: col-start 2 / full-end;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 8rem;
  justify-content: center;
  margin-top: 1rem;

  ${media.tabletExtraSmall`
    grid-column: full;
    display: flex;
    flex-direction: column; 
    margin-top: -1rem;
  `};

  .image {
    grid-column: 1/2;
    max-width: 100%;
    max-height: 75vh;
    ${media.tabletExtraSmall`
    margin: 0 auto;`};
  }

  .product-info {
    grid-column: 2/3;
    margin-right: 5rem;

    display: flex;
    flex-flow: column;

    ${media.tabletExtraSmall`
      margin: 5rem auto 0 ;
    `};
    ${media.phone`
      margin: 3rem 4rem 0;
    `};

    button {
      margin: 4rem auto;
    }

    .name {
      font-size: 3.2rem;
      white-space: nowrap;
    }
    .brand {
      color: ${theme.grey_4};
      font-size: 2.5rem;
    }
    .price {
      font-size: 2.5rem;
      font-weight: 500;
      /* margin: 3rem 0 5rem; */
      margin: 1rem 0 3rem;
    }
    .color-size-text {
      font-size: 17px;
      font-weight: 400;
      margin: 13px 0;
    }

    #cart-notification {
      font-size: 1.8rem;
      font-weight: 600;
    }
    .details-container {
      font-size: 1.5rem;
      line-height: 1.8;

      .detail {
        display: grid;
        grid-template-columns: 2.5rem max-content;

        p {
          color: ${theme.grey_6};
        }

        svg {
          fill: ${theme.grey_6};
        }

        .thread-wheel {
          margin-left: 1px !important;
        }
      }
    }
  }
`;

const activeClassName = "nav-item-active";
const StyledColor = styled(NavLink).attrs({
  activeClassName
})`
  display: inline-block;
  margin-right: 13px;
  padding: 4px;
  border: 1.5px solid transparent;
  border-radius: 50%;
  transition: all 0.3s ease-out;
  margin-bottom: 2rem;

  &.${activeClassName},
  &:hover,
  &:active {
    color: ${props => `${props.theme.primary} !important`};
    border-color: ${theme.grey_7};
  }
`;
StyledColor.displayName = "Color"; //for testing

const Color = styled.div`
  background-color: ${props => props.colorCode};
  display: inline-block;
  border: ${props => props.colorCode === "#fff" && `1px solid ${props.theme.grey_1}`};
  width: 25px;
  height: 25px;
  border-radius: 50%;
  justify-content: center;
  vertical-align: middle;
`;
