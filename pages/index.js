import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import AppContext from "../components/AppContext";
import Content from "../components/Content";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import LoadMore from "../components/LoadMore";
import SortMenu from "../components/SortMenu";
import Spinner from "../components/Spinner";
import "./index.scss";

/**
 * Our default root view will also be the all
 * quotes view.
 */
const Index = () => {
  const {
    allQuotes,
    setAllQuotes,
    pagination,
    setPagination,
    allQuotesCount,
    setAllQuotesCount,
    sortSelection,
    isFetching,
    setIsFetching
  } = useContext(AppContext);

  /**
   * By passing an empty array to this useEffect hook as
   * a dependency, we fetch the inital quotes and set
   * them and the pagination results with useState on
   * ComponentDidMount.
   */
  useEffect(() => {
    const fetchQuotes = async () => {
      const url = `https://auth0-exercise-quotes-api.herokuapp.com/api/quotes?pageSize=6`;
      const apiResponse = await fetch(url).then(response =>
        response.json().then(data => data)
      );
      setAllQuotesCount(
        apiResponse && apiResponse.results && apiResponse.results.length
      );
      setPagination(apiResponse.pagination);
      setAllQuotes(apiResponse.results);
    };
    /**
     * If we already have allQuotes, don't overwrite
     * what we already have saved on a re-route.
     */
    if (!allQuotes) {
      fetchQuotes();
    }
  }, []);

  const fetchMoreQuotes = () => {
    const fetchQuotesByPage = async () => {
      let page = pagination.page;
      page = page + 1;

      const url = `https://auth0-exercise-quotes-api.herokuapp.com/api/quotes?pageSize=6&page=${page}`;
      const apiResponse = await fetch(url).then(response =>
        response.json().then(data => data)
      );

      const prefilteredQuotes = allQuotes.concat(apiResponse.results);
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
      setAllQuotesCount(
        apiResponse && apiResponse.results && apiResponse.results.length
          ? apiResponse.results.length + allQuotesCount
          : allQuotesCount
      );
      setPagination(apiResponse.pagination);
      setAllQuotes(dedupedQuotes);
      setIsFetching(false);
    };
    setIsFetching(true);
    fetchQuotesByPage();
  };

  const showSortAndFooter = !!(
    pagination &&
    allQuotesCount &&
    allQuotesCount !== pagination.rowCount
  );

  return (
    <Layout>
      {allQuotes ? (
        <>
          {/**
           * Will need to listen for device width
           * here and column layout this instead when
           * on a small device
           */}
          <ContentHeader>
            <TitleText>All Quotes</TitleText>
            {showSortAndFooter && <SortMenu />}
          </ContentHeader>
          <Content quotes={allQuotes} />
          {showSortAndFooter && (
            <Footer>
              <LoadMore isLoading={isFetching} handleClick={fetchMoreQuotes} />
            </Footer>
          )}
        </>
      ) : (
        <Spinner />
      )}
    </Layout>
  );
};

const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  height: 120px;
  padding: 0 8%;
`;

const TitleText = styled.h1`
  font-size: 22.5px;
  text-align: left;
  vertical-align: top;
  letter-spacing: -0.14px;
  /* overwrite default h1 margin */
  margin: 0px;
`;

export default Index;
