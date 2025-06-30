// ProductSort component: renders a select dropdown for sorting products by various options.
import styled from "styled-components";
import React from "react";

const SortWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const Select = styled.select`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
`;

function ProductSort({ value, onChange, options }) {
  // Renders a select element with provided sorting options
  return (
    <SortWrapper>
      <Select value={value} onChange={onChange}>
        {options &&
          options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
      </Select>
    </SortWrapper>
  );
}

export default ProductSort;
