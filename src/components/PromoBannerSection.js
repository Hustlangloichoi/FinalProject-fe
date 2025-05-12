import styled from "styled-components";
import React from "react";

const Section = styled.section`
  padding: 30px 0;
  background: #33acff;
  text-align: center;
`;

const PromoBannerSection = () => (
  <Section className="promo-banner-section">
    <h2>SPECIAL OFFER!</h2>
    <p>
      Get 20% off on your first order. Use code: <b>WELCOME20</b>
    </p>
  </Section>
);

export default PromoBannerSection;
