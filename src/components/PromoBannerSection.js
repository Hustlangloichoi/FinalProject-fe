import { styled } from "@mui/material/styles";
import React from "react";

const Section = styled('section')(({ theme }) => ({
  padding: '30px 0',
  background: theme.palette.mode === 'light' ? '#33acff' : '#1565c0',
  textAlign: 'center',
  color: theme.palette.mode === 'light' ? '#fff' : '#e3f2fd',
  
  '& h2': {
    margin: '0 0 16px 0',
    color: 'inherit',
  },
  
  '& p': {
    margin: 0,
    color: 'inherit',
  },
  
  '& b': {
    color: 'inherit',
    fontWeight: 'bold',
  },
  
  '@media (max-width: 600px)': {
    padding: '16px 0',
  },
}));

const PromoBannerSection = () => (
  <Section className="promo-banner-section">
    <h2>SPECIAL OFFER!</h2>
    <p>
      Get 20% off on your first order. Use code: <b>WELCOME20</b>
    </p>
  </Section>
);

export default PromoBannerSection;
