import styled from "styled-components";
import React, { useRef, useState, useEffect } from "react";
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

function ProductSearch({ value, onChange, onSearch, reset }) {
  const inputRef = useRef();
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    if (reset) {
      setDebouncedValue("");
    }
  }, [reset]);

  const handleInputChange = (e) => {
    setDebouncedValue(e.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the page from scrolling to the top
      if (onSearch) {
        onSearch(debouncedValue); // Trigger search only on Enter
      }
    }
  };

  const handleClick = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (onSearch) {
      onSearch(debouncedValue);
    }
  };

  return (
    <Wrapper>
      <StyledInput
        ref={inputRef}
        type="text"
        placeholder="Search for products..."
        value={debouncedValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown} // Add keydown handler
      />
      <IconWrapper as="button" type="button" onClick={handleClick}>
        <SearchIcon />
      </IconWrapper>
    </Wrapper>
  );
}

export default ProductSearch;
