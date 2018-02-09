import React from "react";
import ItemGrid from "./ItemGrid";
import theme from "../theme";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import AnimatedLink from './AnimatedLink';

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

      return <React.Fragment key={categoryName}>
          <StyledLink to={this.mainPath + categoryName}>{categoryName}</StyledLink>
          {brandLinks}
        </React.Fragment>;
    });

    return (
      <Styles>
        <Sidebar>
          <StyledLink view_all={currentCategory} to={this.mainPath}>
            {this.viewAllText}
          </StyledLink>
          {categoryNavItems}
        </Sidebar>
        <Main>
          {currentCategory && <CategoryHeader>{currentBrand + " " + currentCategory}</CategoryHeader>}
          {this.renderProductsDisplayed()}
        </Main>
      </Styles>
    );
  }
}

export default Shop;

const CategoryHeader = styled.h1`
  font-size: 2.5rem;
  font-weight: 500;

  margin-bottom: 6rem;

  margin-left: 1rem;
`;

const Styles = styled.div`
  grid-column: full;
  justify-self: center;
  display: grid;
  grid-template-columns: 1fr 25rem minmax(min-content, 90rem) 1fr;
  /* grid-template-columns: 1fr rem minmax(min-content, 50rem) 1fr; */
`;

const Sidebar = styled.div`
  grid-column: 2/3;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* width: 25rem; */
  position: fixed;
`;
const Main = styled.div`
  grid-column: 3/4;

  .item-grid {
    margin-bottom: 12rem;
  }
`;
const activeClassName = "nav-item-active";
const StyledLink = styled(NavLink).attrs({
  activeClassName
})`
  font-size: 2rem;
  margin-bottom: 1.6rem;

  &.${activeClassName}, &:hover,
  &:active {
    color: ${props => !props.view_all && `${props.theme.primary} !important`};
  }
`;

const StyledSubLink = StyledLink.extend`
  color: orangered;
  /* margin-left: 2rem; */
  padding-left: 2rem;

  margin-bottom: 1rem;
  font-size: 1.6rem;
  white-space: no-wrap;
  

  &.${activeClassName}, &:hover {
    /* color: ${theme.primary} !important; */
    /* background-color: ${theme.grey_1}; */
    /* background-color: red; */
  }
`;
