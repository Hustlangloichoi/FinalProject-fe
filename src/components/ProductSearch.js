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
  const [searchValue, setSearchValue] = useState(value || "");
  const debounceTimerRef = useRef(null);

  useEffect(() => {
    if (reset) {
      setSearchValue("");
    }
  }, [reset]);
  // Debounce effect for automatic search
  useEffect(() => {
    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Only search if there's actual content
    if (searchValue.trim() !== "") {
      // Set new timer for debounced search
      debounceTimerRef.current = setTimeout(() => {
        if (onSearch) {
          onSearch(searchValue);
        }
      }, 500); // 500ms debounce time
    } else {
      // If search is empty, call onSearch immediately to clear results
      if (onSearch) {
        onSearch("");
      }
    }

    // Cleanup function
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchValue, onSearch]); // Added onSearch back since it's now wrapped in useCallback

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSearchValue(newValue);

    // Also call onChange immediately for controlled input if needed
    if (onChange) {
      onChange(e);
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the page from scrolling to the top

      // Clear debounce timer and search immediately
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      if (onSearch) {
        onSearch(searchValue); // Trigger search immediately on Enter
      }
    }
  };

  const handleClick = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Clear debounce timer and search immediately
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (onSearch) {
      onSearch(searchValue);
    }
  };

  return (
    <Wrapper>
      <StyledInput
        ref={inputRef}
        type="text"
        placeholder="Search for products..."
        value={searchValue}
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
