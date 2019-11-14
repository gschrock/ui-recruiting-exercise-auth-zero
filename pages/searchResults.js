import Link from "next/link";
import { useContext } from "react";
import styled from "styled-components";
import AppContext from "../components/AppContext";
import Content from "../components/Content";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import LoadMore from "../components/LoadMore";
import SortMenu from "../components/SortMenu";
import Spinner from "../components/Spinner";
import "./index.scss";

const SearchResultsView = () => {
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
    isFetchingMore,
    setIsFetchingMore
  } = useContext(AppContext);

  const fetchMoreQuotes = () => {
    const fetchQuotesByPage = async () => {
      let page = searchPagination.page;
      page = page + 1;

      const url =
        selection === "Author"
          ? `https://auth0-exercise-quotes-api.herokuapp.com/api/quotes?pageSize=6&page=${page}&authorName=${searchInput}`
          : `https://auth0-exercise-quotes-api.herokuapp.com/api/quotes?pageSize=6&page=${page}&text=${searchInput}`;
      const apiResponse = await fetch(url).then(response =>
        response
          .json()
          .then(data => data)
          .catch(error => {
            console.log("Error occurred:", error);
          })
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
      setIsFetchingMore(false);
    };
    setIsFetchingMore(true);
    fetchQuotesByPage();
  };

  const showSortAndFooter = !!(
    searchPagination &&
    searchQuotesCount &&
    searchQuotesCount !== searchPagination.rowCount
  );

  return (
    <Layout>
      {!isFetching ? (
        <>
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
          <Content quotes={searchQuotes} quoteCardType={"search"} />
          {showSortAndFooter && (
            <Footer>
              <LoadMore
                isLoading={isFetchingMore}
                handleClick={fetchMoreQuotes}
              />
            </Footer>
          )}
        </>
      ) : (
        <Spinner />
      )}
    </Layout>
  );
};

const ContentHeader = styled.nav`
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

const ResultText = styled.h1`
  padding: 0 8% 40px 8%;
  font-weight: bold;
  font-size: 22.5px;
  letter-spacing: -0.14px;
  /* overwrite default h1 margin */
  margin: -20px 0px 0px 0px;
`;

export default SearchResultsView;
