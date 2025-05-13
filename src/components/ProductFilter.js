import { FMultiCheckbox, FRadioGroup } from "./form";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import apiService from "../app/apiService";

export const SORT_BY_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "priceDesc", label: "Price: High-Low" },
  { value: "priceAsc", label: "Price: Low-High" },
];

export const FILTER_PRICE_OPTIONS = [
  { value: "all", label: "All" },
  { value: "below", label: "Below $25" },
  { value: "between", label: "Between $25 - $75" },
  { value: "above", label: "Above $75" },
];

const FilterWrapper = styled.div`
  padding: 24px;
  width: 250px;
`;
const SectionTitle = styled.h6`
  font-weight: 600;
  margin: 0 0 8px 0;
`;
const ClearButton = styled.button`
  font-size: 1rem;
  padding: 8px 16px;
  border: 1px solid #1976d2;
  background: #fff;
  color: #1976d2;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: #1976d2;
    color: #fff;
  }
`;

function ProductFilter({ resetFilter }) {
  const [categories, setCategories] = useState(["All"]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await apiService.get("/categories");
        // Support both { category: [...] } and { categories: [...] }
        const cats = res.data.category || res.data.categories || res.data.data?.category || [];
        setCategories(["All", ...cats.map((c) => c.name)]);
      } catch (err) {
        setCategories(["All"]);
      }
    }
    fetchCategories();
  }, []);

  return (
    <FilterWrapper>
      <div style={{ marginBottom: 24 }}>
        <SectionTitle>Category</SectionTitle>
        <FRadioGroup
          name="category"
          options={categories}
          row={false}
        />
      </div>
      <div style={{ marginBottom: 24 }}>
        <SectionTitle>Price</SectionTitle>
        <FRadioGroup
          name="priceRange"
          options={FILTER_PRICE_OPTIONS.map((item) => item.value)}
          getOptionLabel={FILTER_PRICE_OPTIONS.map((item) => item.label)}
        />
      </div>
      <ClearButton type="button" onClick={resetFilter}>
        <ClearAllIcon style={{ fontSize: 20 }} />
        Clear All
      </ClearButton>
    </FilterWrapper>
  );
}

export default ProductFilter;
