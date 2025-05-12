import styled from "styled-components";
import React from "react";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  padding: 8px;
  width: 300px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

function ProductSearch({ value, onChange }) {
  return (
    <Wrapper>
      <StyledInput
        type="text"
        placeholder="Search for products..."
        value={value}
        onChange={onChange}
      />
    </Wrapper>
  );
}

export default ProductSearch;
