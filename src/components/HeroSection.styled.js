import styled from "styled-components";

export const HeroSectionWrapper = styled.section`
  position: relative;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const HeroVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`;

export const HeroContent = styled.div`
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

export const HeroTitle = styled.h1`
  word-break: break-word;
  width: 100%;
  overflow-wrap: break-word;
  white-space: normal;
`;

export const HeroDesc = styled.p`
  word-break: break-word;
  width: 100%;
  overflow-wrap: break-word;
  white-space: normal;
  margin-top: 0px;
`;

export const HeroForm = styled.form`
  margin: 0px 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  overflow: hidden;
`;

export const HeroInput = styled.input`
  padding: 8px;
  width: 100%;
  max-width: 250px;
  margin-bottom: 0;
  margin-right: 8px;
  box-sizing: border-box;
  overflow: hidden;
  white-space: normal;
`;

export const HeroButton = styled.button`
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
