import React, { Component, Fragment } from "react";
import styled from "styled-components";
import theme, { Grid } from "../theme";
import RadioInput from "./GeneralUI/RadioInput";
import WarningText from "./WarningText";
import ReactImageMagnify from "react-image-magnify";
import { Form, Field } from "react-final-form";
import { NavLink } from "react-router-dom";
import Check_svg from "../images/svgs/check.svg";
import Icon from "./Icon";
import { ICONS } from "./constants";
import { TransitionMotion, spring } from "react-motion";
import Transition from "react-motion-ui-pack";
import Button from "./GeneralUI/Button";

const RadioInputs = props => {
  const { name, options, customOnChange, error } = props;
  return (
    <Inputs_Styled error={error}>
      {options.map((option, i) => (
        <Field key={i} name={name} component="input">
          {({ input, meta }) => {
            return (
              <Fragment>
                <input
                  {...input}
                  type="radio"
                  onChange={value => {
                    customOnChange(option.value);
                    return input.onChange(value);
                  }}
                  id={i}
                  value={option.value}
                />
                <label htmlFor={i}>{option.displayValue}</label>
                {/* {meta.submitFailed && <span>{meta.error}</span>} */}
              </Fragment>
            );
          }}
        </Field>
      ))}
    </Inputs_Styled>
  );
};

class ProductPage extends Component {
  constructor(props) {
    super(props);
    const { products, match, productLimit, sizeOptions } = props;

    this.sameProducts = products[match.params.category].filter(
      product => match.params.name === product.name && match.params.brand === product.brand
    );

    Object.assign(this, { productLimit, sizeOptions });
    this.purchasedNotification = "Added to cart!";
    // this.limitReachedNotification =
    //   "You've reached the limit of 10 for this item and size. Please see cart for details.";
    this.limitReachedNotification = "Quantity limit reached!";
    this.notificationTimer = 1000;
    this.timeoutId;
    this.state = {
      sizeText: "",
      cartNotificationText: "",
      quantityLimitReached: false,
      product: this.getProduct(match.params.color),
      productInCart: undefined,
      selectedSize: undefined,
      imageError: false
    };
  }

  getProduct(color) {
    const product = this.sameProducts.filter(product => color === product.color)[0];
    return product;
  }

  checkProductInCart() {
    const productInCart = this.props.cart.find(cartProduct => {
      return cartProduct.id === this.state.product.id && cartProduct.size === this.state.product.size;
    });

    if (productInCart) {
      this.setState(
        {
          productInCart: productInCart
        },
        function() {
          this.checkQuantityLimit();
        }
      );
      return true;
    } else {
      this.setState({
        productInCart: undefined
      });
      this.clearQuantityLimit();
      return false;
    }
  }

  clearQuantityLimit() {
    //if quantity is not reached, reset state
    this.setState({
      quantityLimitReached: false,
      sizeText: ""
    });
  }

  checkQuantityLimit() {
    // debugger;
    const { productInCart, quantityLimitReached } = this.state;
    if (productInCart.quantity === this.productLimit) {
      this.setState({
        quantityLimitReached: true
      });
    } else {
      this.clearQuantityLimit();
    }
  }

  componentWillMount() {
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.color !== nextProps.match.params.color) {
      this.setState(
        {
          product: { ...this.getProduct(nextProps.match.params.color), size: this.state.selectedSize }
        },
        function() {
          this.checkProductInCart();
        }
      );
    }
  }

  componentDidUpdate() {}

  updateProduct = eventValue => {
    clearTimeout(this.timeoutId);
    const selectedProduct = { ...this.state.product, size: eventValue };
    this.setState(
      {
        product: selectedProduct,
        selectedSize: eventValue,
        sizeText: eventValue,
        cartNotificationText: ""
      },
      function() {
        this.checkProductInCart();
      }
    );
  };

  onSubmit = values => {
    if (!this.state.product.size) {
      this.setState({
        sizeText: "Select size"
      });
      return;
    }

    this.props.addToCart(this.state.product, () => {
      const limitReached = this.state.productInCart && this.state.productInCart.quantity >= this.productLimit - 1;
      this.setState({ cartNotificationText: this.purchasedNotification }, function() {
        this.timeoutId = setTimeout(
          () =>
            this.setState({
              cartNotificationText: "",
              quantityLimitReached: limitReached
            }),
          this.notificationTimer
        );
      });

      if (!this.state.productInCart) {
        this.checkProductInCart();
      } else {
        const updatedProductInCart = { ...this.state.productInCart };
        updatedProductInCart.quantity++;
        this.setState({ productInCart: updatedProductInCart });
      }
    });
    // this.checkProductInCart();
  };

  handleImageError = () => {
    console.log("error occured!");
    throw new Error("image source not found");
    this.setState({ imageError: true });
  };

  // willEnter() {
  //   return { opacity: spring(1) };
  // }
  // willLeave() {
  //   return { opacity: spring(0) };
  // }

  render() {
    const { quantityLimitReached, sizeText, cartNotificationText, product, selectedSize, productInCart } = this.state;
    const colorOptions = this.sameProducts.map(product => (
      <StyledColor
        key={product.color}
        to={this.props.location.pathname.replace(this.props.match.params.color, product.color)}
        replace
      >
        <Color colorCode={product.colorCode} />
      </StyledColor>
    ));

    //used for selecting in test
    Form.displayName = "Form";
    const buttonDisabled = quantityLimitReached || cartNotificationText;

    return (
      <Grid>
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
              <StyledColorsContainer>{colorOptions}</StyledColorsContainer>
            </div>
            <Form
              onSubmit={this.onSubmit}
              render={({ handleSubmit, reset, submitting, pristine, values }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <WarningText
                      id="size-text"
                      className="color-size-text"
                      warn={!selectedSize && sizeText}
                      showUserInput={selectedSize}
                    >
                      {(selectedSize && (
                        <span>
                          <strong>Size: </strong>
                          {selectedSize}
                        </span>
                      )) || <strong>Select size</strong> ||
                        sizeText}
                    </WarningText>
                    <RadioInputs
                      name="size"
                      options={this.sizeOptions}
                      customOnChange={this.updateProduct}
                      error={!selectedSize && sizeText}
                    />
                    {/* <WarningText id="limit-notification" success>
                      {quantityLimitReached && this.limitReachedNotification}
                    </WarningText> */}
                    <Button
                      color={(quantityLimitReached && "disabled") || (buttonDisabled && "primary") || "black"}
                      type="submit"
                      disabled={buttonDisabled}
                      width="25rem"
                    >
                      {cartNotificationText || (quantityLimitReached && this.limitReachedNotification) || "Add to Cart"}
                    </Button>
                  </form>
                );
              }}
            />
            <div className="details-container">
              <div className="detail">
                <span>
                  <Icon icon={ICONS.WASHING_MACHINE} />
                </span>
                <p>Machine washable</p>
              </div>
              <div className="detail">
                <span>
                  <Icon icon={ICONS.THREAD_WHEEL} size={19} />
                </span>
                <p>Made in Bentonville, AR</p>
              </div>
            </div>
            {/* <div className="description">
              <h3 className="title">Description</h3>
              <p className="content">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam ad dolor iure similique magnam,
                totam accusantium illo natus error. Fugiat facere unde harum dolor dicta aliquid quibusdam.
              </p>
            </div> */}
          </div>
        </Styled>
      </Grid>
    );
  }
}

export default ProductPage;

const StyledColorsContainer = styled.div``;

const activeClassName = "nav-item-active";
const StyledColor = styled(NavLink).attrs({
  activeClassName
})`
  display: inline-block;
  margin-right: 1rem;
  padding: 0.4rem;
  border: 1.5px solid transparent;
  border-radius: 50%;
  transition: all 0.3s ease-out;
  margin-bottom: 2rem;

  &.${activeClassName}, &:hover,
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
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  justify-content: center;
  vertical-align: middle;
`;

const Styled = styled.div`
  grid-column: col-start 2 / full-end;

  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 8rem;
  justify-content: center;

  margin-top: 1rem;
  .image {
    grid-column: 1/2;
    /* height: 75vh; */
    max-width: 100%;
    max-height: 75vh;
  }

  .product-info {
    grid-column: 2/3;
    margin-right: 5rem;

    display: flex;
    flex-flow: column;

    button {
      margin: 3rem auto 4rem;
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
      margin: 1rem 0 5rem;
    }
    .color-size-text {
      font-size: 1.75rem;
      /* color: ${theme.grey_6}; */
      font-weight: 500;
      margin: 1rem 0;
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
    .description {
      line-height: 1.5;
      text-align: justify;
      .title {
        font-size: 1.5rem;
        font-weight: 500;
        color: ${theme.grey_4};
      }
      .content {
        font-size: 1.2rem;
        color: ${theme.grey_6};
      }
    }
  }
`;

const Inputs_Styled = styled.div`
  display: flex;
  justify-content: space-between;
  width: 20rem;
  margin-top: -0.5rem;
  padding: 0.3rem 0.4rem;
  border: ${props => `1px solid ${(props.error && props.theme.danger) || "transparent"}`};
  border-radius: 3px;
  transition: all 0.2s;

  input {
    display: none;

    & + label:hover,
    &:checked + label {
      border: 1px solid ${theme.black};
      border-radius: 2px;
      color: ${theme.black};
      transition: all 0.3s ease-out;
    }
  }
  label {
    color: ${theme.grey_6};
    display: inline-block;
    cursor: pointer;
    font-size: 1.6rem;
    font-weight: 600;
    border: 1px solid transparent;
    padding: 0.4rem 0.7rem;
    user-select: none;
  }
`;
