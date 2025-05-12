import styled from "styled-components";
import React from "react";

const Section = styled.section`
  padding: 30px 0;
  background: #fff;
`;

const Title = styled.h2`
  text-align: center;
`;

const CategoriesWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 20px;
`;

const CategoryItem = styled.div`
  text-align: center;
`;

const CategoryIcon = styled.div`
  font-size: 2.5rem;
`;

const categories = [
  { name: "Vitamins", icon: "💊" },
  { name: "Supplements", icon: "🧴" },
  { name: "Personal Care", icon: "🧼" },
  { name: "Medical Devices", icon: "🩺" },
];

const CategorySection = () => (
  <Section className="category-section">
    <Title>Shop by Category</Title>
    <CategoriesWrapper>
      {categories.map((cat) => (
        <CategoryItem key={cat.name}>
          <CategoryIcon>{cat.icon}</CategoryIcon>
          <div>{cat.name}</div>
        </CategoryItem>
      ))}
    </CategoriesWrapper>
  </Section>
);

export default CategorySection;
