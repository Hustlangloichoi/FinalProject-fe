import styled from "styled-components";
import React from "react";

const Wrapper = styled.section`
  position: relative;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const Video = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.85);
  padding: 0px;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  text-align: center;
  max-width: 700px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  @media (max-width: 600px) {
    padding: 16px 18px;
  }
`;

const Title = styled.h1`
  word-break: break-word;
  width: 100%;
  overflow-wrap: break-word;
  white-space: normal;
`;

const Desc = styled.p`
  word-break: break-word;
  width: 100%;
  overflow-wrap: break-word;
  white-space: normal;
  margin-top: 0px;
`;

const HeroSection = () => {
  return (
    <Wrapper>
      <Video autoPlay loop muted playsInline>
        <source
          src="https://videos.pexels.com/video-files/8088983/8088983-sd_960_506_24fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </Video>
      <Content>
        <Title>Welcome to KN Store</Title>
        <Desc>
          Your trusted medical device supplier. Fast delivery, best prices!
        </Desc>
      </Content>
    </Wrapper>
  );
};

export default HeroSection;
