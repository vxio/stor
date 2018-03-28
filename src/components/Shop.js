import React from "react";
import ItemGrid from "./ItemGrid";
import theme, { Grid, media } from "../theme";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import NavDrawer from "./NavDrawer";

class Shop extends React.Component {
  viewAllText = "All";
  mainPath = this.props.match.path.split(":")[0]; // === /shop/
  products = this.props.products;
  itemGrid;

  validateUrlParams(categoryName, brandName) {
    if (categoryName) {
      let category;
      category = Object.keys(this.products).find(category => category === categoryName);
      if (category) {
        if (brandName) {
          if (this.products[category].find(product => product.brand === brandName)) {
            return;
          }
        } else {
          return;
        }
      }
    } else {
      return; //returns if no categoryName param
    }
    this.props.history.replace("/shop");
  }

  setUrlParams(props) {
    const { category, brand } = props.match.params;
    this.categoryFromParams = category;
    this.brandFromParams = brand;
  }

  renderProductsDisplayed() {
    const { products } = this.props;
    console.log("function called");
    if (!this.categoryFromParams) {
      let productsDisplay = [];
      for (let category in products) {
        productsDisplay.push();
        productsDisplay.push(
          <React.Fragment key={category}>
            <CategoryHeader>{category}</CategoryHeader>
            <ItemGrid className="item-grid" key={category} items={products[category]} displayText />
          </React.Fragment>
        );
      }
      return <React.Fragment>{productsDisplay}</React.Fragment>;
    } else if (!this.brandFromParams) {
      return <ItemGrid displayText items={products[this.categoryFromParams]} />;
    } else {
      const filteredBrands = products[this.categoryFromParams].filter(
        product => product.brand === this.brandFromParams
      );
      return <ItemGrid displayText items={filteredBrands} />;
    }
  }

  componentWillMount() {
    this.setUrlParams(this.props);
    this.validateUrlParams(this.categoryFromParams, this.brandFromParams);
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    this.setUrlParams(nextProps);
    this.validateUrlParams(this.categoryFromParams, this.brandFromParams);

    if (this.props.match.url !== nextProps.match.url) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { match } = this.props;
    const itemGrid = this.renderProductsDisplayed();

    const categoryNavItems = Object.keys(this.products).map(categoryName => {
      const filteredBrands = [...new Set(this.products[categoryName].map(product => product.brand))].sort(
        (a, b) => a > b
      );

      let brandLinks;
      if (match.params.category !== categoryName) {
        brandLinks = null;
      } else {
        brandLinks = filteredBrands.map(brand => (
          <StyledSubLink key={brand} to={`${this.mainPath}${categoryName}/${brand}`}>
            {brand}
          </StyledSubLink>
        ));
      }

      return (
        <React.Fragment key={categoryName}>
          <StyledLink to={this.mainPath + categoryName}>{categoryName}</StyledLink>
          {brandLinks}
        </React.Fragment>
      );
    });

    const shopMenu = (
      <React.Fragment>
        <StyledLink exact to={this.mainPath}>
          {this.viewAllText}
        </StyledLink>
        {categoryNavItems}
      </React.Fragment>
    );

    return (
      <Grid>
        <Styles>
          <NavDrawer>{shopMenu}</NavDrawer>
          <Sidebar>{shopMenu}</Sidebar>
          <Main>
            {this.categoryFromParams && (
              <CategoryHeader>{`${this.brandFromParams || ""} ${this.categoryFromParams}`}</CategoryHeader>
            )}
            {itemGrid}
          </Main>
        </Styles>
      </Grid>
    );
  }
}

export default Shop;

const Styles = styled.div`
  grid-column: full;
  display: grid;
  grid-template-columns: 22rem 1fr;
  ${media.phone`
    display: flex;
    flex-direction: column;
    margin-top: -2rem;
  `};
`;

const CategoryHeader = styled.h1`
  font-size: 3.3rem;
  font-weight: 400;
  margin-bottom: 4.5rem;
  margin-left: 1rem;

  ${media.tabletSmall`
    margin-left: 0; 
    margin-bottom: 2.5rem;
  `};
  ${media.phone`
    font-weight: 700;
  `};
  ${media.phoneSmall`
    margin-left: -4rem; 
  `};
`;

const Sidebar = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 20rem;
  ${media.phone`
    display: none;
  `};
`;
const Main = styled.div`
  grid-column: 2/3;
  margin-left: 2rem;
  ${media.phoneSmall`
    margin-left:2rem;
  `};
  ${media.phone`
    margin-left: 4rem;
  `};
`;
const activeClassName = "nav-item-active";
const StyledLink = styled(NavLink).attrs({
  activeClassName
})`
  font-size: 2.1rem;
  margin: 0.8rem 0;
  width: 100%;
  transition: border 0.1s ease, color 0.3s ease, padding 0.3s ease;
  color: ${theme.black};

  &.${activeClassName}, &:hover,
  &:active {
    color: ${theme.primary} !important;
    border-left: 2px solid ${theme.primary};
    padding-left: 1rem;
  }
  ${media.phone`
    font-size: 2.5rem;
    margin: 1.5rem 0;
  `};
`;

const StyledSubLink = StyledLink.extend`
  padding-left: 2rem !important;
  border-left: none !important;
  font-size: 1.6rem;
  white-space: no-wrap;
  margin: 0.5rem 0;
  ${media.phone`
    font-size: 2rem; 
    margin: 1rem 0;
  `};
  &:hover {
    padding-left: 2.7rem !important;
  }
`;
