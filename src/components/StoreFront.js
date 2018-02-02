import React, { Component } from "react";
import ParallaxBanner from "./ParallaxBanner";
import TextContent from "./TextContent";
import ItemGrid from "./ItemGrid";
import styled from "styled-components";
import ScrollY from "./ScrollY";

class StoreFront extends Component {
  render() {
    return (
      <ScrollY
        render={y => (
          <React.Fragment>
            <ParallaxBanner position={y} />
            <HomeContent>
              <TextContent title="Unique Style">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </TextContent>
              <ItemGrid products={this.props.products} position={y} />
              <TextContent title="Clothing Store">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </TextContent>
            </HomeContent>
          </React.Fragment>
        )}
      />
    );
  }
}

const HomeContent = styled.div`
  grid-column: center;


  display: grid;
  grid-template-columns:
   1fr repeat(2,minmax(14rem, auto)) 1fr;
  grid-template-rows: auto;
`;

export default StoreFront;
