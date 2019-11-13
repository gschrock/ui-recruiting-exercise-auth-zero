import { withRouter } from "next/router";
import React, { useContext } from "react";
import styled from "styled-components";
import AppContext from "./AppContext";

const Search = ({ className, handleSearch, router }) => {
  const { searchInput, setSearchInput, setSearchQuotes } = useContext(
    AppContext
  );

  return (
    <div className={className}>
      <SearchInput
        /**
         * If the route is the search results view, give the
         * search input element focus.
         */
        autoFocus={router.pathname === "/searchResults"}
        onChange={e => {
          setSearchInput(e.currentTarget.value);
          handleSearch(e.currentTarget.value);
        }}
        value={searchInput}
        placeholder={"Enter your search term"}
      ></SearchInput>
      {/**
       * If we have a search input value, display an
       * x icon that can remove the search input and
       * reset our search quotes.
       */}
      {searchInput && searchInput.length > 0 ? (
        <Icon
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSearchInput("");
            setSearchQuotes(undefined);
          }}
          className={"icon-budicon-471"}
        />
      ) : (
        <Icon className={"icon-budicon-489 icon"} />
      )}
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

export default withRouter(StyledSearch);
