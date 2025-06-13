import React, { useEffect, useState } from "react";
import styled from "styled-components";
import apiService from "../app/apiService";

const Section = styled.section`
  padding: 30px 0;
  background: #fff;
`;

const CategoriesWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 20px;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    display: none; /* Hide categories on mobile */
  }
`;

const CategoryItem = styled.div`
  text-align: center;
  min-width: 140px;
  flex: 1 1 180px;
  max-width: 200px;
  font-size: 1.5rem; /* Slightly reduced font size */

  @media (max-width: 900px) {
    flex: 1 1 45%;
    max-width: 48%;
  }

  @media (max-width: 600px) {
    flex: 1 1 100%;
    max-width: 100%;
  }
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
        const cats =
          res.data.category ||
          res.data.categories ||
          res.data.data?.category ||
          [];
        setCategories(cats);
      } catch (err) {
        setCategories([]);
      }
    }
    fetchCategories();
  }, []);

  return (
    <Section className="category-section">
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
