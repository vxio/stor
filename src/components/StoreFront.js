import React, { Component } from "react";
import TextContent from "./TextContent";
import styled from "styled-components";
import ScrollY from "./ScrollY";
import { Link } from "react-router-dom";

import image1 from "../images/Homepage/female_teal_jacket_carhartt.jpg";
import image2 from "../images/Homepage/grey_clothes_rack.jpg";
import image3 from "../images/Homepage/female_grey_beanie.jpg";
import image4 from "../images/Homepage/male_dramatic_frontshot.png";
// import image5 from "../images/Homepage/brick_wall.jpg";

class StoreFront extends Component {
  render() {
    return (
      <ScrollY
        render={y => (
          <React.Fragment>
            <HomeContent>
              <TextContent className="text-content text-1" title="Designed to last">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
                <br /> <br />
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.
              </TextContent>
              <Image_One src={image1} />
              <TextContent className="text-content text-2" title="Who we are">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </TextContent>
              <FixedBackground />
              <TextContent className="text-content text-3" title="About Us">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </TextContent>

              <TwoImageContainer>
                <img className="image-3" src={image3} alt="" />
                <img className="image-4" src={image4} alt="" />
              </TwoImageContainer>
              <LinkToShop to="/shop">> Explore our latest collection</LinkToShop>
              {/* <img className="image-5" src={image5} alt=""/> */}
            </HomeContent>
          </React.Fragment>
        )}
      />
    );
  }
}

const LinkToShop = styled(Link)`
  margin-top: 10rem;
  margin-bottom: 2rem;
  grid-column: 5/10;
  justify-self: end;
  font-size: 2.1rem;
`;
const TwoImageContainer = styled.div`
  /* display */
  grid-column: 2/ 10;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 4rem;
  & .image-3 {
    grid-column: 1;
  }

  & .image-4 {
    grid-column: 2;
  }
`;

const HomeContent = styled.div`
margin-top: -5rem;
  grid-column: full;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: 85vh 40rem 45vh 30rem min-content;
  /* height: 400rem; */

  img {
    width: 100%;
  }

  & .text-content {
    grid-column: 3 / 6;
    justify-self: center;
  }
  & .text-1 {
    /* margin-top: 10rem; */
    /* margin-bottom: 4rem; */
    align-self: center;
  }

  & .text-2 {
    /* grid-column: 1 / 5; */
    justify-self: center;
    align-self: end;
    margin-bottom: 6rem;
  }

  & .text-3 {
    /* margin-top: 4rem; */
      margin: 10rem 0 0;
  }

  & .image-5 {
    /* grid-column: 1/-1; */
  }
`;

const Image_One = styled.img`
  grid-column: 7 / -1;
  /* height: 100%; */
  /* margin-right: 4rem; */
  /* width: 100%; */
  justify-self: center;
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
