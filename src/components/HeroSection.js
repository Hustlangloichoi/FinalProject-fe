import { styled } from "@mui/material/styles";
import React from "react";

// Hero section: displays a prominent intro area with background video and content
// UI: styled section with overlay content
const Wrapper = styled("section")({
  position: "relative",
  minHeight: "500px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",

  "@media (max-width: 768px)": {
    minHeight: "400px",
  },

  "@media (max-width: 480px)": {
    minHeight: "350px",
  },
});

const Video = styled("video")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  zIndex: 0,
});

const Content = styled("div")(({ theme }) => ({
  position: "relative",
  zIndex: 1,
  background:
    theme.palette.mode === "light"
      ? "rgba(255, 255, 255, 0.85)"
      : "rgba(30, 30, 30, 0.85)",
  padding: "24px",
  borderRadius: "16px",
  boxShadow:
    theme.palette.mode === "light"
      ? "0 4px 24px rgba(0, 0, 0, 0.08)"
      : "0 4px 24px rgba(0, 0, 0, 0.3)",
  textAlign: "center",
  maxWidth: "700px",
  width: "90%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",

  "@media (max-width: 768px)": {
    padding: "20px",
    maxWidth: "90%",
    borderRadius: "12px",
  },

  "@media (max-width: 600px)": {
    padding: "16px 18px",
    maxWidth: "95%",
    borderRadius: "8px",
  },
}));

const Title = styled("h1")(({ theme }) => ({
  wordBreak: "break-word",
  width: "100%",
  overflowWrap: "break-word",
  whiteSpace: "normal",
  margin: "0 0 16px 0",
  fontSize: "2.5rem",
  fontWeight: 700,
  color: theme.palette.primary.main,

  "@media (max-width: 768px)": {
    fontSize: "2rem",
  },

  "@media (max-width: 600px)": {
    fontSize: "1.75rem",
  },

  "@media (max-width: 480px)": {
    fontSize: "1.5rem",
  },
}));

const Desc = styled("p")(({ theme }) => ({
  wordBreak: "break-word",
  width: "100%",
  overflowWrap: "break-word",
  whiteSpace: "normal",
  marginTop: "0px",
  fontSize: "1.1rem",
  color: theme.palette.text.secondary,
  lineHeight: 1.6,

  "@media (max-width: 768px)": {
    fontSize: "1rem",
  },

  "@media (max-width: 600px)": {
    fontSize: "0.95rem",
  },
}));

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
