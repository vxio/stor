import React from "react";
import ItemGrid from "./ItemGrid";
import theme, { Grid } from "../theme";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import AnimatedLink from "./AnimatedLink";

class Shop extends React.Component {
  state = {
    products: this.props.products,
    currentCategory: "",
    currentBrand: "" //default is empty string (all), could be Tees, Sweatshirts, etc..
  };
  viewAllText = "All";
  mainPath = this.props.match.path.split(":")[0]; // == /shop/

  updateView(props) {
    // if(this.match.params)
    const params = props.match.params;
    // console.log(this.match);
    if (!params.category) {
      this.setState({ currentCategory: "", currentBrand: "" });
    } else if (!params.brand) {
      this.setState({ currentCategory: params.category, currentBrand: "" });
    } else {
      //no category set, dont need to filter
      this.setState({
        currentCategory: params.category,
        currentBrand: params.brand
      });
    }
  }

  componentWillMount() {
    this.updateView(this.props);
    window.scrollTo(0, 0);
  }
  componentWillReceiveProps(nextProps) {
    console.log("will receive props");
    this.updateView(nextProps);

    console.log(this.props);
    console.log(nextProps);
    if (this.props.match.url !== nextProps.match.url) {
      window.scrollTo(0, 0);
    }
  }

  componentDidUpdate() {
    console.table(this.state);
  }

  renderProductsDisplayed() {
    const { products } = this.props;
    if (!this.state.currentCategory) {
      // return Object.keys(products).map(category => <ItemGrid key={category} displayText items={products[category]} />);
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
      console.log(productsDisplay);
      return <React.Fragment>{productsDisplay}</React.Fragment>;
    } else if (!this.state.currentBrand) {
      console.log("in no brand");
      return <ItemGrid displayText items={products[this.state.currentCategory]} />;
    } else {
      const filteredBrands = products[this.state.currentCategory].filter(
        product => product.brand === this.state.currentBrand
      );
      console.log(filteredBrands);
      return <ItemGrid displayText items={filteredBrands} />;
    }
  }

  render() {
    const { products, currentCategory, currentBrand } = this.state;
    const { match } = this.props;

    const categoryNavItems = Object.keys(products).map(categoryName => {
      const filteredBrands = [...new Set(products[categoryName].map(product => product.brand))].sort((a, b) => a > b);

      const brandLinks =
        match.params.category !== categoryName
          ? null
          : filteredBrands.map(brand => (
              <StyledSubLink key={brand} to={`${this.mainPath}${categoryName}/${brand}`}>
                {brand}
              </StyledSubLink>
            ));

      return (
        <React.Fragment key={categoryName}>
          <StyledLink to={this.mainPath + categoryName}>{categoryName}</StyledLink>
          {brandLinks}
        </React.Fragment>
      );
    });

    return (
      <Grid>
        <Styles>
            <Sidebar>
              <StyledLink exact to={this.mainPath}>
                {this.viewAllText}
              </StyledLink>
              {categoryNavItems}
            </Sidebar>
          <Main>
            {currentCategory && <CategoryHeader>{currentBrand + " " + currentCategory}</CategoryHeader>}
            {this.renderProductsDisplayed()}
          </Main>
        </Styles>
      </Grid>
    );
  }
}

export default Shop;

const Styles = styled.div`
  grid-column: full;
  /* display: flex;
  & > *:first-child {
    margin-right: 5rem;
  } */
  display: grid;
  grid-template-columns: 22rem 1fr; 
`;

const CategoryHeader = styled.h1`
  font-size: 3.3rem;
  font-weight: 400;
  margin-bottom: 4.5rem;
  margin-left: 1rem;
`;

const Sidebar = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 20rem;
`;
const Main = styled.div`
  grid-column: 2/3;
  margin-left: 2rem;
  .item-grid {
    margin-bottom: 12rem;
  }
`;
const activeClassName = "nav-item-active";
const StyledLink = styled(NavLink).attrs({
  activeClassName
})`
  font-size: 2rem;
  margin: 0.6rem 0;
  width: 100%;
  transition: border 0.1s ease, color 0.3s ease, padding 0.3s ease;
  color: ${theme.black};

  &.${activeClassName}, &:hover,
  &:active {
    color: ${theme.primary} !important;
    border-left: 2px solid ${theme.primary};
    padding-left: 1rem;
  }
`;

const StyledSubLink = StyledLink.extend`
  padding-left: 2rem !important;
  border-left: none !important;

  font-size: 1.6rem;
  white-space: no-wrap;
  margin: .5rem 0;
  

   &:hover {
    padding-left: 2.7rem !important;
    /* color: ${theme.primary} !important; */
    /* background-color: ${theme.grey_1}; */
    /* background-color: red; */
  }
`;
