import React, { Component } from "react";
import ParallaxHeader from "components/parallaxHeader/parallaxHeader";
import TextContent from "components/TextContent/TextContent";
import ItemGrid from "containers/ItemGrid/ItemGrid";
import styled from "styled-components";

class EventContainer extends Component {
  state = {
    position: null
  };

  componentDidMount() {
    window.addEventListener("scroll", this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  }

  onScroll = () => {
    this.setState({
      position: window.scrollY || window.scrollTop || document.getElementsByTagName("html")[0].scrollTop
    });
    // console.log(this.state.position);
  };

  render() {
    console.log(this.props);
    return (
      <div>
        {/* <ParallaxHeader position={this.state.position} /> */}
        <HomeContentBox>
          <TextContent title="Unique Style">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </TextContent>
          <ItemGrid products={this.props.products} />
          <TextContent title="Clothing Store">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </TextContent>
        </HomeContentBox>
      </div>
    );
  }
}

const HomeContentBox = styled.div`
  width: 50%;
  margin: 0 auto;
`;

export default EventContainer;
