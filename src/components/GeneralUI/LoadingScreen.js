import React from "react";
import styled from "styled-components";
import {variables} from "../../theme";
import { ClipLoader } from "react-spinners";

const LoadingScreen = props => {
  return (
    <Styles>
      <ClipLoader size={100} color={variables.primary}/>
    </Styles>
  );
};

export default LoadingScreen;

const Styles = styled.div`
 height: 100vh;
 display: flex;
 justify-content: center;
 align-items: center; 
`;

