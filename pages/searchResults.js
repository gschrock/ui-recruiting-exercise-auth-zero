import Link from "next/link";
import { useContext } from "react";
import styled from "styled-components";
import AppContext from "../components/AppContext";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import LoadButton from "../components/LoadButton";
import SortMenu from "../components/SortMenu";
import Spinner from "../components/Spinner";
import "./index.scss";

const SearchResultsView = ({ router }) => {
  const {
    searchQuotes,
    setSearchQuotes,
    searchPagination,
    setSearchPagination,
    searchQuotesCount,
    setSearchQuotesCount,
    selection,
    sortSelection,
    searchInput,
    isFetching,
    setIsFetching
  } = useContext(AppContext);

  const fetchQuotes = () => {
    const fetchQuotesByPage = async () => {
      let page = searchPagination.page;
      page = page + 1;

      const url =
        selection === "Author"
          ? `https://auth0-exercise-quotes-api.herokuapp.com/api/quotes?pageSize=6&page=${page}&authorName=${searchInput}`
          : `https://auth0-exercise-quotes-api.herokuapp.com/api/quotes?pageSize=6&page=${page}&text=${searchInput}`;
      const apiResponse = await fetch(url).then(response =>
        response.json().then(data => data)
      );

      const prefilteredQuotes = searchQuotes.concat(apiResponse.results);
      let dedupedQuotes = prefilteredQuotes.reduce(
        (accumulator, currentItem) => {
          if (
            accumulator.findIndex(item => item.id === currentItem.id) === -1
          ) {
            accumulator.push(currentItem);
          }
          return accumulator;
        },
        []
      );
      dedupedQuotes =
        sortSelection === "Author: A-Z"
          ? dedupedQuotes.sort((a, b) =>
              a.authorName.localeCompare(b.authorName)
            )
          : dedupedQuotes.sort((a, b) =>
              b.authorName.localeCompare(a.authorName)
            );
      setSearchQuotesCount(
        apiResponse && apiResponse.results && apiResponse.results.length
          ? apiResponse.results.length + searchQuotesCount
          : searchQuotesCount
      );
      setSearchPagination(apiResponse.pagination);
      setSearchQuotes(dedupedQuotes);
      setIsFetching(false);
    };
    setIsFetching(true);
    fetchQuotesByPage();
  };

  const showSortAndFooter = !!(
    searchPagination &&
    searchQuotesCount &&
    searchQuotesCount !== searchPagination.rowCount
  );

  return (
    <Layout>
      {searchQuotes ? (
        <>
          {/**
           * Will need to listen for device width
           * here and column layout this instead when
           * on a small device
           */}
          <ContentHeader>
            <Link href="/">
              <GoBackLink>
                <Icon className={"icon-budicon-521 icon"} />
                <div>Go Back</div>
              </GoBackLink>
            </Link>
            {showSortAndFooter && <SortMenu />}
          </ContentHeader>
          <ResultText>{`${
            searchPagination && searchPagination.rowCount
              ? `We found ${searchPagination.rowCount} results`
              : "No results found"
          }`}</ResultText>
          <Content>
            {searchQuotes &&
              searchQuotes.map(quote => (
                <Card
                  key={quote.id}
                  number={quote.id}
                  text={quote.text}
                  author={quote.authorName}
                />
              ))}
          </Content>
          {showSortAndFooter && (
            <Footer>
              <StyledHR />
              <LoadButton isLoading={isFetching} handleClick={fetchQuotes} />
            </Footer>
          )}
        </>
      ) : (
        <Spinner />
      )}
    </Layout>
  );
};

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 376px));
  justify-items: center;
  justify-content: space-between;
  padding: 0 8%;
`;

const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 45px 8% 20px 8%;
`;

const Icon = styled.i`
  font-size: 22px;
  margin: 5px 10px 0px 0px;
`;

const GoBackLink = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #0d96c6;
  font-size: 16px;
  letter-spacing: 0.5px;
`;

const ResultText = styled.div`
  padding: 0 8% 40px 8%;
  font-weight: bold;
  font-size: 22.5px;
  letter-spacing: -0.14px;
  margin-top: -20px;
`;

const StyledHR = styled.hr`
  height: 1px;
  width: 100%;
  color: ${({ theme }) => theme.colors.solidLine};
  margin-left: auto;
  margin-right: auto;
`;

export default SearchResultsView;
