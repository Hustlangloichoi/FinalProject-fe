import styled from "styled-components";
import React from "react";
import { CircularProgress } from "@mui/material";

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function LoadingScreen() {
  return (
    <Wrapper>
      <CircularProgress />
    </Wrapper>
  );
}

export default LoadingScreen;
