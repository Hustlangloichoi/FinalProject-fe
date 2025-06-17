import { styled } from "@mui/material/styles";
import React from "react";

const Section = styled('section')(({ theme }) => ({
  padding: '30px 0',
  background: theme.palette.mode === 'light' ? '#33acff' : '#1565c0',
  color: theme.palette.mode === 'light' ? '#000' : '#e3f2fd',
  
  '@media (max-width: 600px)': {
    paddingLeft: '8px',
    paddingRight: '8px',
  },
}));

const Title = styled('h2')(({ theme }) => ({
  textAlign: 'center',
  color: 'inherit',
  margin: '0 0 20px 0',
}));

const TestimonialsWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'row', /* Align cards horizontally for PC */
  justifyContent: 'center', /* Center cards horizontally */
  gap: '20px',
  marginTop: '20px',

  '@media (max-width: 600px)': {
    flexDirection: 'column', /* Align cards vertically for mobile */
    gap: '16px', /* Adjust gap for mobile */
  },
});

const TestimonialCard = styled('div')(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.text.primary,
  padding: '20px',
  borderRadius: '8px',
  minWidth: '200px',
  boxShadow: theme.palette.mode === 'light'
    ? '0 2px 8px rgba(0, 0, 0, 0.1)'
    : '0 2px 8px rgba(0, 0, 0, 0.3)',
}));

const TestimonialName = styled('div')(({ theme }) => ({
  fontWeight: 'bold',
  marginTop: '10px',
  color: 'inherit',
}));

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
