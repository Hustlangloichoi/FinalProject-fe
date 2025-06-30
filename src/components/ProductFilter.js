// ProductFilter component: allows users to filter products by category and price, and clear all filters.
// Fetches categories from the API and manages filter state using react-hook-form.
import { FMultiCheckbox, FRadioGroup } from "./form";
import { useFormContext } from "react-hook-form";
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
  padding: 8px;
  width: 250px;

  @media (max-width: 900px) {
    width: 100%;
    padding: 16px;
  }

  @media (max-width: 600px) {
    padding: 12px;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 8px 0;

  @media (max-width: 600px) {
    font-size: 1.3rem;
  }
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
  width: 100%;
  justify-content: center;

  &:hover {
    background: #1976d2;
    color: #fff;
  }

  @media (max-width: 600px) {
    padding: 12px 16px;
    font-size: 0.95rem;
  }
`;

function ProductFilter({ resetFilter, clearSearch }) {
  const [categories, setCategories] = useState(["All"]);
  const { setValue, watch } = useFormContext();
  const selectedCategories = watch("category") || [];

  useEffect(() => {
    // Fetch categories from the API when the component mounts
    async function fetchCategories() {
      try {
        const res = await apiService.get("/categories");
        const cats =
          res.data.category ||
          res.data.categories ||
          res.data.data?.category ||
          [];
        setCategories(["All", ...cats.map((c) => c.name)]);
      } catch (err) {
        setCategories(["All"]);
      }
    }
    fetchCategories();
  }, []);

  // Handles changes to the selected categories, ensuring 'All' logic is respected
  const handleCategoryChange = (option) => {
    if (option === "All") {
      setValue("category", ["All"]);
    } else {
      let newValue = selectedCategories.filter((cat) => cat !== "All");
      if (selectedCategories.includes(option)) {
        newValue = newValue.filter((cat) => cat !== option);
      } else {
        newValue = [...newValue, option];
      }
      if (newValue.length === 0) {
        setValue("category", ["All"]);
      } else {
        setValue("category", newValue);
      }
    }
  };

  return (
    <FilterWrapper>
      <div style={{ marginBottom: 24 }}>
        <SectionTitle>Category</SectionTitle>
        <FMultiCheckbox
          name="category"
          options={categories}
          onChange={handleCategoryChange}
          value={selectedCategories}
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
      <ClearButton
        type="button"
        onClick={() => {
          resetFilter();
          if (clearSearch) {
            clearSearch(); // Clear the search input
          }
        }}
      >
        <ClearAllIcon style={{ fontSize: 20 }} />
        Clear All
      </ClearButton>
    </FilterWrapper>
  );
}

export default ProductFilter;
