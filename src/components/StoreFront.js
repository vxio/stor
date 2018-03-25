import React, { Component } from "react";
import TextContent from "./TextContent";
import styled from "styled-components";
import theme, { media } from "../theme";
import ScrollY from "./ScrollY";
import { Link } from "react-router-dom";
import LinkWithHoverEffect from "./LinkWithHoverEffect";

import image1 from "../images/Homepage/female_teal_jacket_carhartt.jpg";
import image2 from "../images/Homepage/hooded_cropped.png";

class StoreFront extends Component {
  render() {
    return (
      <HomeContent>
        <TextContent animation className="text-content left-side text-1" title="Designed To Last">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
          <br /> <br />
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </TextContent>
        <img className="image image-1" src={image1} alt="Woman in teal jacket" />
        <TextContent animation={{ delay: 1 }} className="text-content left-side text-2" title="Who We Are">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </TextContent>
        <img className="image image-2" src={image2} alt="Man in hoodie and windbreaker" />
        <TextContent animation={{ delay: 1.4 }} className="text-content text-3" title="About Us">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </TextContent>
        <LinkToShop size={13} to="/shop">
          Explore our latest collection
        </LinkToShop>
        {/* <img className="image-5" src={image5} alt=""/> */}
      </HomeContent>
    );
  }
}

const LinkToShop = styled(LinkWithHoverEffect)`
  margin-top: 7rem;
  margin-bottom: 2rem;
  grid-column: 2 / 11;
  margin-left: auto;
  color: ${theme.grey_7};
  ${media.tabletLarge`grid-column-end: full-end;`};
  ${media.phone`
  margin-right: auto;
  `};
`;

const HomeContent = styled.div`
  grid-column: full;
  display: grid;
  grid-template-columns: 4rem [full-start] repeat(10, 1fr) [full-end] 4rem;

  .image.image {
    width: 100%;
    ${media.phone`
        grid-column: full;
        margin-top: 4rem;
      `};
  }

  .image-1 {
    grid-column: 8 / -1;
  }

  .image-2 {
    grid-column: 3/7;
    margin-top: 8rem;
    ${media.tabletLarge`grid-column-start: 2;`};
  }

  .text-content.text-content {
    width: 100%;

    ${media.phone`
    grid-column: full;
    margin-top: 4rem;
    `};
  }
  .left-side {
    grid-column: 3 / span 3;
    ${media.laptop`grid-column-end: span 4;`};
    ${media.tabletSmall`
    grid-column: 2 / span 5;`};
  }

  .text-1 {
    margin-top: 20rem;
    ${media.tabletSmall`
        margin-top: 8em;`};
  }

  .text-2 {
    margin-top: 10rem;
  }

  .text-3 {
    margin-top: 28rem;
    grid-column: 8 / span 3;
    ${media.laptop`grid-column-end: span 5;`};
  }
`;

const FixedBackground = styled.div`
  /* height: 50rem; */
  background-image: url(${image2});
  background-size: auto 100%; //adjust height for the size of the navbar
  /* padding-top: 50rem; */
  background-attachment: fixed;
  background-position: top;
  overflow: hidden;
  grid-column: 1/-1;
  background-repeat: no-repeat;
`;
const Image_Two = styled.img`
  grid-column: 1 / -1;
  width: 100%;
  overflow-y: hidden;
`;
export default StoreFront;
