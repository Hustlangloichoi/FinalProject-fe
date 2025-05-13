import styled from "styled-components";
import React, { useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  padding: 8px;
  width: 300px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px 0 0 4px;
  outline: none;
`;

const IconWrapper = styled.button`
  background: #1976d2;
  color: #fff;
  padding: 8px;
  border-radius: 0 4px 4px 0;
  display: flex;
  align-items: center;
  height: 36px;
  border: none;
  cursor: pointer;
`;

function ProductSearch({ value, onChange, onSearch }) {
  const inputRef = useRef();

  const handleClick = (e) => {
    e.preventDefault(); // Just in case
    if (onSearch) {
      onSearch(inputRef.current ? inputRef.current.value : value);
    }
  };

  return (
    <Wrapper>
      <StyledInput
        ref={inputRef}
        type="text"
        placeholder="Search for products..."
        value={value}
        onChange={onChange}
      />
      <IconWrapper as="button" type="button" onClick={handleClick}>
        <SearchIcon />
      </IconWrapper>
    </Wrapper>
  );
}

export default ProductSearch;
