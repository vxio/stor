import React, { Component } from "react";
import ProductCard from "./ProductCard";
import styled from "styled-components";

class ItemGrid extends Component {
  saveRef = ref => (this.containerNode = ref);
  measure() {
    const { clientWidth, clientHeight } = this.containerNode;
    console.log(clientHeight);
  }
  componentDidMount() {
    this.measure();
  }
  render() {
    const { position, products, displayText } = this.props;
    const classes = [];
    const bottomY = position + window.innerHeight;

    function handleScroll() {
      // if ($(".clothes-pics").offset().top < wScroll + $(window).height() * 0.8) {
      //   $(".clothes-pics figure").each(function(i) {
      //     setTimeout(function() {
      //       $(".clothes-pics figure")
      //         .eq(i)
      //         .addClass("is-showing");
      //     }, 150 * (i + 1));
      //   });
      // }
      // console.log(this.containerNode);
    }
    // window.addEventListener("scroll", handleScroll());

    let productsArray = products.map((product, i) => (
      <div className={classes.join(" ")}>
        <ProductCard key={i} product={product} displayText={displayText} />
      </div>
    ));

    return <Grid innerRef={this.saveRef}>{productsArray}</Grid>;
  }
}

const Grid = styled.div`
  grid-column: 2 / 4;
  justify-self: center;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 2rem;
  grid-row-gap: 4rem;

  & > * {
    transform: translateX(-3rem);
    /* border: 1px solid red; */
  }

  .is-showing {
    border: 1px solid red;
  }
`;

export default ItemGrid;
