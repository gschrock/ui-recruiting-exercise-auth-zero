import React, { useContext } from "react";
import styled from "styled-components";
import AppContext from "./AppContext";

const Search = ({ className, handleSearch }) => {
  const { searchInput, setSearchInput } = useContext(AppContext);
  return (
    <div className={className}>
      <SearchInput
        /**
         * Keeps focus on search input between navigations.
         * We could search the document for the element, but
         * this is sufficient for now so typing feels mostly
         * seemless.
         */
        autoFocus
        onChange={e => {
          setSearchInput(e.currentTarget.value);
          handleSearch();
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
