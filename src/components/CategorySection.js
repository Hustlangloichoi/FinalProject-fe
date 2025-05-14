import React, { useEffect, useState } from "react";
import styled from "styled-components";
import apiService from "../app/apiService";

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

const ICONS = ["💊", "🧴", "🧼", "🩺", "🧪", "🩹", "🦽", "🧯", "🩸", "🧬"];

const CategorySection = ({ onCategoryClick }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await apiService.get("/categories");
        const cats = res.data.category || res.data.categories || res.data.data?.category || [];
        setCategories(cats);
      } catch (err) {
        setCategories([]);
      }
    }
    fetchCategories();
  }, []);

  return (
    <Section className="category-section">
      <Title>Shop by Category</Title>
      <CategoriesWrapper>
        {categories.map((cat, idx) => (
          <CategoryItem
            key={cat._id || cat.name}
            style={{ cursor: "pointer" }}
            onClick={() => onCategoryClick && onCategoryClick(cat.name)}
          >
            <CategoryIcon>{ICONS[idx % ICONS.length]}</CategoryIcon>
            <div>{cat.name}</div>
          </CategoryItem>
        ))}
      </CategoriesWrapper>
    </Section>
  );
};

export default CategorySection;
