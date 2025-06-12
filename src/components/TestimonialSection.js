import styled from "styled-components";
import React from "react";

const Section = styled.section`
  padding: 30px 0;
  background: #33acff;
  @media (max-width: 600px) {
    padding-left: 8px;
    padding-right: 8px;
  }
`;

const Title = styled.h2`
  text-align: center;
`;

const TestimonialsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 20px;
  flex-wrap: wrap;
  @media (max-width: 600px) {
    gap: 12px;
    justify-content: flex-start;
  }
`;

const TestimonialCard = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  min-width: 200px;
`;

const TestimonialName = styled.div`
  font-weight: bold;
  margin-top: 10px;
`;

const testimonials = [
  { name: "Alice", text: "Great service and fast delivery!" },
  { name: "Bob", text: "Wide range of products and good prices." },
  { name: "Carol", text: "Customer support was very helpful." },
];

const TestimonialSection = () => (
  <Section className="testimonial-section">
    <Title>What Our Customers Say</Title>
    <TestimonialsWrapper>
      {testimonials.map((t, idx) => (
        <TestimonialCard key={idx}>
          <p>"{t.text}"</p>
          <TestimonialName>- {t.name}</TestimonialName>
        </TestimonialCard>
      ))}
    </TestimonialsWrapper>
  </Section>
);

export default TestimonialSection;
