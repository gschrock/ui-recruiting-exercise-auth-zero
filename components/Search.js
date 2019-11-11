import Router from "next/router";
import React from "react";
import styled from "styled-components";
import debounce from "../utils/debounce";

const Search = ({ className, handleSearch, searchInput, setSearchInput }) => {
  return (
    <div className={className}>
      <SearchInput
        onChange={e => {
          Router.push("/searchResults");
          setSearchInput(e.currentTarget.value);
          debounce(handleSearch(), 250);
        }}
        value={searchInput}
        placeholder={"Enter your search term"}
      ></SearchInput>
      <Icon className={"icon-budicon-489 icon"} />
    </div>
  );
};

const SearchInput = styled.input`
  display: flex;
  align-items: center;
  width: 366px;
  height: 40px;
  background-color: white;
  padding: 9px;
  border-radius: 0px 4px 4px 0px;
  border: 1px ${({ theme }) => theme.colors.subtleText} solid;
  border-left-width: 0px;
  font-size: 16px;
  letter-spacing: 0.5px;
`;

const Icon = styled.i`
  position: absolute;
  top: 20%;
  left: 90%;
`;

const StyledSearch = styled(Search)`
  position: relative;
  color: ${({ theme }) => theme.colors.subtleText};
`;

export default StyledSearch;
