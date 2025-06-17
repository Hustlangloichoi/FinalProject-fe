import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import apiService from "../app/apiService";

const Section = styled('section')(({ theme }) => ({
  padding: '30px 0',
  background: theme.palette.background.paper,
  
  '@media (max-width: 768px)': {
    padding: '20px 0',
  },
}));

const CategoriesWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  gap: '30px',
  marginTop: '20px',
  flexWrap: 'wrap',
  padding: '0 20px',

  '@media (max-width: 900px)': {
    gap: '20px',
  },
  
  '@media (max-width: 768px)': {
    gap: '15px',
    padding: '0 15px',
  },

  '@media (max-width: 600px)': {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '12px',
    padding: '0 10px',
  },
});

const CategoryItem = styled('div')({
  textAlign: 'center',
  minWidth: '140px',
  flex: '1 1 180px',
  maxWidth: '200px',
  fontSize: '1.5rem',
  cursor: 'pointer',
  transition: 'transform 0.2s ease',
  
  '&:hover': {
    transform: 'translateY(-5px)',
  },

  '@media (max-width: 900px)': {
    flex: '1 1 45%',
    maxWidth: '48%',
    minWidth: '120px',
  },

  '@media (max-width: 600px)': {
    flex: '1 1 100%',
    maxWidth: '100%',
    minWidth: '100px',
    fontSize: '1.2rem',
  },
  
  '@media (max-width: 480px)': {
    fontSize: '1rem',
    minWidth: '80px',
  },
});

const CategoryIcon = styled('div')({
  fontSize: '2.5rem',
  marginBottom: '8px',
  
  '@media (max-width: 768px)': {
    fontSize: '2rem',
  },
  
  '@media (max-width: 600px)': {
    fontSize: '1.8rem',
    marginBottom: '6px',
  },
  
  '@media (max-width: 480px)': {
    fontSize: '1.5rem',
  },
});

const CategoryName = styled('div')(({ theme }) => ({
  fontSize: '0.9rem',
  fontWeight: 500,
  color: theme.palette.text.primary,
  
  '@media (max-width: 600px)': {
    fontSize: '0.8rem',
  },
  
  '@media (max-width: 480px)': {
    fontSize: '0.75rem',
  },
}));

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
            onClick={() => onCategoryClick && onCategoryClick(cat.name)}
          >
            <CategoryIcon>{ICONS[idx % ICONS.length]}</CategoryIcon>
            <CategoryName>{cat.name}</CategoryName>
          </CategoryItem>
        ))}
      </CategoriesWrapper>
    </Section>
  );
};

export default CategorySection;
