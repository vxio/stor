import React from "react";
import styled from "styled-components";
import backgroundImage from "images/bird-bg.jpg";
import backgroundImage_new from "images/frost-forest-cropped_3.jpg";
import logo from "images/black-bird-logo.svg";
import foregroundImage_reverted from "images/cropped-tree-shrunk-reverted.png";
import small_twig from "images/cropped-tree-shrunk-small-twig.png";
import medium_twig from "images/cropped-tree-shrunk-med-twig.png";
import midgroundImage_2 from "images/back-bird.png";

const ParallaxBanner = props => {
  return (
    <HeaderContainer>
      <CompanyName style={{ transform: `translateY(${props.position / 2.2}%)` }}>Heart of the Oak</CompanyName>
      <ForegroundImg style={{ transform: `translateY(${-props.position / 45}%)` }} />
      {/* <ForegroundImg_2 style={{ transform: `translateY(${-props.position / 40}%)` }} /> */}
      <ForegroundImg_3 style={{ transform: `translateY(${-props.position / 45}%)` }} />
    </HeaderContainer>
  );
};
const CompanyName = styled.h1`
  position: absolute;
  /* font-family: "Roboto Slab"; */
  font-family: "Alegreya";
  font-size: 10rem;
  font-weight: 500;
  letter-spacing: .4rem;

  margin-top: -7rem;
  translate: transformX(-50%);
  color: #fff;
  top: 40%;
  width: 100%;
  text-align: center;
  /* z-index: -1; */

  & > button {
  }
`;

const HeaderContainer = styled.div`
  position: relative;
  height: 38rem;
  background-image: url(${backgroundImage_new});
  background-size: auto 43rem; //adjust height for the size of the navbar
  /* padding-top: 50rem; */
  background-attachment: fixed;
  overflow: hidden;
  grid-column: full;
  /* filter: blur(1px); */
  /* z-index: -2; */
`;

// const MidgroundImg = styled.div`
//   height: 100px;
//   width: 100%;
//   background-image: url(${logo});
//   background-position: center;
//   background-repeat: no-repeat;
//   position: absolute;
//   top: 50%;
//   margin-top: -50px;

//   /* transform: translateY(${props => props.position / 2}%); */
// `;

// const MidGroundImg_2 = styled.div`
//   width: 300px;
//   height: 300px;
//   background-image: url(${midgroundImage_2});
//   background-repeat: no-repeat;
//   background-position: top left;
//   position: absolute;
//   left: 50%;
//   margin-left: -480px;
// `;

const ForegroundImg = styled.div`
  width: 560px;
  height: 740px;
  position: absolute;
  background-image: url(${foregroundImage_reverted});
  background-repeat: no-repeat;
  background-position: right;
  background-size: 40%;
  top: -15%;

  left: 48%;
  // margin-left: -480px;
  /* top: -10%; */
  /* z-index: -3; */
  /* transform: translateY(${props => props.position / -40}%); */
`;

const ForegroundImg_2 = styled.div`
  width: 560px;
  height: 740px;
  position: absolute;
  background-image: url(${small_twig});
  background-repeat: no-repeat;
  /* background-position: bottom; */
  background-size: 48%;
  /* top: 75%; */

  left: 16%;
  // margin-left: -480px;
  top: 35%;
  /* z-index: -3; */
  /* transform: translateY(${props => props.position / -40}%); */
`;

const ForegroundImg_3 = styled.div`
  width: 560px;
  height: 740px;
  position: absolute;
  background-image: url(${medium_twig});
  background-repeat: no-repeat;
  /* background-position: bottom; */
  background-size: 40%;
  top: 60%;

  left: 15%;
  // margin-left: -480px;
  /* top: -10%; */
  /* z-index: -3; */
  /* transform: translateY(${props => props.position / -40}%); */
`;
export default ParallaxBanner;
