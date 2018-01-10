import React from "react";
import styled from "styled-components";
import backgroundImage from "../../images/bird-bg.jpg";
import logo from "images/black-bird-logo.svg";
import foregroundImage from "images/fore-bird.png";
import midgroundImage_2 from "images/back-bird.png";

const ParallaxHeader = props => {
  return (
    <HeaderContainer>
      <MidgroundImg style={{ transform: `translateY(${props.position / 2}%)` }} />
      <MidGroundImg_2 style={{ transform: `translateY(${props.position / 4}%)` }} />
      <ForegroundImg style={{ transform: `translateY(${-props.position / 40}%)` }} />
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  position: relative;
  height: 500px;
  background-image: url(${backgroundImage});
  background-size: auto 600px; //or use 'contain'
  background-position: top;
  background-attachment: fixed;
  overflow: hidden;
`;

const MidgroundImg = styled.div`
  height: 100px;
  width: 100%;
  background-image: url(${logo});
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
  top: 50%;
  margin-top: -50px;
  /* transform: translateY(${props => props.position / 2}%); */
`;

const MidGroundImg_2 = styled.div`
  width: 300px;
  height: 300px;
  background-image: url(${midgroundImage_2});
  background-repeat: no-repeat;
  background-position: top left;
  position: absolute;
  left: 50%;
  margin-left: -480px;
`;

const ForegroundImg = styled.div`
  width: 500px;
  height: 733px;
  background-image: url(${foregroundImage});
  background-repeat: no-repeat;
  background-position: right bottom;
  position: absolute;
  left: 50%;
  // margin-left: -480px;
  top: 60%;
  /* transform: translateY(${props => props.position / -40}%); */
`;

export default ParallaxHeader;
