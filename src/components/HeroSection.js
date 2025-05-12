import styled from "styled-components";
import React, { useState } from "react";

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
  height: 160px;
  box-sizing: border-box;
  overflow: auto;
  word-break: break-word;
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

const Form = styled.form`
  margin: 0px 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  overflow: hidden;
`;

const SearchInput = styled.input`
  padding: 8px;
  width: 100%;
  max-width: 250px;
  margin-bottom: 0;
  margin-right: 8px;
  box-sizing: border-box;
  overflow: hidden;
  white-space: normal;
`;

const SearchButton = styled.button`
  padding: 8px 10px;
  background: #1976d2;
  color: #fff;
  border: none;
  border-radius: 4px;
  width: auto;
  max-width: 100px;
  box-sizing: border-box;
  overflow: hidden;
  white-space: normal;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: #1251a3;
  }
`;

const HeroSection = ({ searchQuery = "", onSearch }) => {
  const [input, setInput] = useState(searchQuery);

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(input);
  };

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
        <Form onSubmit={handleSearch}>
          <SearchInput
            type="text"
            placeholder="Search for products..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <SearchButton type="submit">Search</SearchButton>
        </Form>
      </Content>
    </Wrapper>
  );
};

export default HeroSection;
