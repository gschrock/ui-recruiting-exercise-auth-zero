import Router from "next/router";
import { useContext } from "react";
import styled from "styled-components";
import debounce from "../utils/debounce";
import AppContext from "./AppContext";
import Search from "./Search";
import Select from "./Select";

/**
 * Header will contain app title and search
 * component.
 */
const Header = ({ className }) => {
  const {
    setSearchQuotes,
    setSearchPagination,
    setSearchQuotesCount,
    selection,
    sortSelection,
    setSelection,
    isSearchMenuOpen,
    setIsSearchMenuOpen,
    searchInput,
    setIsFetching
  } = useContext(AppContext);

  const handleSearch = searchValue => {
    Router.push("/searchResults");

    const fetchQuotes = async () => {
      const url =
        selection === "Author"
          ? `https://auth0-exercise-quotes-api.herokuapp.com/api/quotes?pageSize=6&authorName=${searchValue}`
          : `https://auth0-exercise-quotes-api.herokuapp.com/api/quotes?pageSize=6&text=${searchValue}`;
      const apiResponse = await fetch(url).then(response =>
        response.json().then(data => data)
      );
      const sortedQuotes =
        sortSelection === "Author: A-Z"
          ? apiResponse &&
            apiResponse.results &&
            apiResponse.results.sort((a, b) =>
              a.authorName.localeCompare(b.authorName)
            )
          : apiResponse &&
            apiResponse.results &&
            apiResponse.results.sort((a, b) =>
              b.authorName.localeCompare(a.authorName)
            );
      setSearchQuotesCount(
        apiResponse && apiResponse.results && apiResponse.results.length
      );
      setSearchQuotes(sortedQuotes);
      setSearchPagination(apiResponse.pagination);
      setIsFetching(false);
    };
    setIsFetching(true);
    fetchQuotes();
  };

  const updateSelectSearch = item => {
    const fetchQuotes = async () => {
      const url =
        item === "Author"
          ? `https://auth0-exercise-quotes-api.herokuapp.com/api/quotes?pageSize=6&authorName=${searchInput}`
          : `https://auth0-exercise-quotes-api.herokuapp.com/api/quotes?pageSize=6&text=${searchInput}`;
      const apiResponse = await fetch(url).then(response =>
        response.json().then(data => data)
      );
      const sortedQuotes =
        sortSelection === "Author: A-Z"
          ? apiResponse &&
            apiResponse.results &&
            apiResponse.results.sort((a, b) =>
              a.authorName.localeCompare(b.authorName)
            )
          : apiResponse &&
            apiResponse.results &&
            apiResponse.results.sort((a, b) =>
              b.authorName.localeCompare(a.authorName)
            );
      setSearchQuotesCount(
        apiResponse && apiResponse.results && apiResponse.results.length
      );
      setSearchQuotes(sortedQuotes);
      setSearchPagination(apiResponse.pagination);
      setIsFetching(false);
    };
    setIsFetching(true);
    fetchQuotes();
  };

  return (
    <header className={className}>
      <IconAndText>
        <Authsvg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="30"
          viewBox="0 0 26 30"
          fill="none"
        >
          <path
            d="M20.4165 24.27L17.541 15L25.0735 9.27C26.9236 15.222 25.0735 20.73 20.4165 24.27ZM25.0735 9.27L22.1979 0H12.8897L15.7538 9.27H25.0735ZM12.8897 0H3.58153L0.71747 9.27H10.0142L12.8897 0ZM0.706014 9.27C-1.13844 15.222 0.706014 20.73 5.36298 24.27L8.22704 15L0.706014 9.27ZM5.36298 24.27L12.8897 30L20.4165 24.27L12.8897 18.54L5.36298 24.27Z"
            fill="#333333"
          />
        </Authsvg>
        <TitleText>Auth0</TitleText>
        <VerticalLine />
        <TitleText>Quotes</TitleText>
      </IconAndText>
      <Select
        selection={selection}
        setSelection={setSelection}
        isMenuOpen={isSearchMenuOpen}
        setIsMenuOpen={setIsSearchMenuOpen}
        listItems={["Author", "Quote"]}
        updateSearchSelection={item => debounce(updateSelectSearch(item), 200)}
      />
      <Search
        handleSearch={searchValue => debounce(handleSearch(searchValue), 2000)}
      />
    </header>
  );
};

const IconAndText = styled.div`
  display: flex;
  align-items: center;
`;

const Authsvg = styled.svg`
  height: 30px;
  width: 100%;
  padding-right: 6px;
`;

const TitleText = styled.span`
  font-size: 22.5px;
  text-align: left;
  vertical-align: top;
  letter-spacing: -0.14px;
`;

const VerticalLine = styled.div`
  margin: 0 20px;
  border-left: 1px solid black;
  height: 40px;
`;

const StyledHeader = styled(Header)`
  display: flex;
  align-items: center;
  padding: 0 8%;
  background-color: #ffffff;
  border-bottom: 1px #e3e5e7 solid;
  color: black;
  width: 100%;
  height: 80px;
`;

export default StyledHeader;
