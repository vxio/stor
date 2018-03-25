import React from "react";
import ItemGrid from "./ItemGrid";
import theme, { Grid, media } from "../theme";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import AnimatedLink from "./AnimatedLink";
import Drawer from "react-motion-drawer";
import * as Icon from "react-feather";

class Shop extends React.Component {
  state = {
    openDrawer: false
  };
  viewAllText = "All";
  mainPath = this.props.match.path.split(":")[0]; // == /shop/
  products = this.props.products;
  itemGrid;

  checkParams(categoryName, brandName) {
    // const { products } = this.state;
    console.log(categoryName, brandName);
    let category, brand;
    if (categoryName) {
      category = Object.keys(this.products).find(category => category === categoryName);
      if (category) {
        if (brandName) {
          brand = this.products[category].find(product => product.brand === brandName);
          console.log(brand);
          if (brand) return;
        } else return;
      }
    } else return; //returns if no categoryName param

    console.log("redirect reached");
    this.props.history.replace("/shop");
  }

  componentWillMount() {
    // const params = this.props.match.params;
    // const {category, brand} = this.props.match.params;
    this.updateParams(this.props);
    this.checkParams(this.categoryFromParams, this.brandFromParams);
    // this.checkParams(category, brand)
    // this.checkParams(params.category, params.brand)

    // this.updateView(this.props);
    window.scrollTo(0, 0);
  }

  updateParams(props) {
    const { category, brand } = props.match.params;
    this.categoryFromParams = category;
    this.brandFromParams = brand;
  }

  componentWillReceiveProps(nextProps) {
    // this.updateView(nextProps);
    // const {category, brand} = nextProps.match.params;
    this.updateParams(nextProps);
    this.checkParams(this.categoryFromParams, this.brandFromParams);

    if (this.props.match.url !== nextProps.match.url) {
      window.scrollTo(0, 0);
    }
  }

  componentDidUpdate() {
    // this.updateView();
  }

  renderProductsDisplayed() {
    const { products } = this.props;
    console.log("function called");
    if (!this.categoryFromParams) {
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

  render() {
    const { openDrawer } = this.state;
    const { match } = this.props;
    const itemGrid = this.renderProductsDisplayed();

    const style = {
      background: "#fff",
      boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
    };
    const drawerProps = {
      drawerStyle: style,
      width: 250,
      overlayColor: "rgba(0,0,0,.2)",
      right: true
    };

    const categoryNavItems = Object.keys(this.products).map(categoryName => {
      const filteredBrands = [...new Set(this.products[categoryName].map(product => product.brand))].sort(
        (a, b) => a > b
      );

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
          <DrawerIcon
            style={{ fontSize: "40px", cursor: "pointer" }}
            onClick={() =>
              this.setState({
                openDrawer: !openDrawer
              })
            }
          >
            <Icon.Menu size={30} />
          </DrawerIcon>
          <Drawer {...drawerProps} open={openDrawer} onChange={open => this.setState({ openDrawer: open })}>
            <Styled_Drawer>{shopMenu}</Styled_Drawer>
          </Drawer>
          <Sidebar>
          {shopMenu} 
          </Sidebar>
          <Main>
            {this.categoryFromParams && (
              <CategoryHeader>{(this.brandFromParams || "") + " " + this.categoryFromParams}</CategoryHeader>
            )}
            {itemGrid}
          </Main>
        </Styles>
      </Grid>
    );
  }
}

export default Shop;

const DrawerIcon = styled.div`
  cursor: pointer;
  margin-left: auto;
  margin-right: 1rem;
  /* margin-bottom: -rem; */
  padding: 0.3rem 1rem;
  display: none;
  ${media.phone`display: inline-block;`};
`;

const Styled_Drawer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8rem 3rem 0 4rem;
`;

const Styles = styled.div`
  grid-column: full;
  /* display: flex;
  & > *:first-child {
    margin-right: 5rem;
  } */
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
  ${media.tabletSmall`margin-left: 0; margin-bottom: 2.5rem`};

  ${media.phone`font-weight: 700;`};
  ${media.phoneSmall`margin-left: -4rem; `};
`;

const Sidebar = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 20rem;
  ${media.phone`display: none;`}
`;
const Main = styled.div`
  grid-column: 2/3;
  margin-left: 2rem;
  .item-grid {
    margin-bottom: 12rem;
  }
  ${media.phoneSmall`margin-left:2rem;`};
  ${media.phone`  margin-left: 4rem;`};
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
  ${media.phone`font-size: 2.5rem; margin: 1.5rem 0`};
`;

const StyledSubLink = StyledLink.extend`
  padding-left: 2rem !important;
  border-left: none !important;

  font-size: 1.6rem;
  white-space: no-wrap;
  margin: .5rem 0;
  ${media.phone`font-size: 2rem; margin: 1rem 0`}
  

   &:hover {
    padding-left: 2.7rem !important;
    /* color: ${theme.primary} !important; */
    /* background-color: ${theme.grey_1}; */
    /* background-color: red; */
  }
`;
