import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import AppContext from "../components/AppContext";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import LoadButton from "../components/LoadButton";
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

  const fetchQuotes = () => {
    const fetchQuotesByPage = async () => {
      let page = pagination.page;
      page = page + 1;

      const url = `https://auth0-exercise-quotes-api.herokuapp.com/api/quotes?pageSize=6&page=${page}`;
      const apiResponse = await fetch(url).then(response =>
        response.json().then(data => data)
      );

      const prefilteredQuotes = allQuotes.concat(apiResponse.results);
      const dedupedQuotes = prefilteredQuotes.reduce(
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
      setPagination(apiResponse.pagination);
      setAllQuotes(dedupedQuotes);
      setIsFetching(false);
    };
    setIsFetching(true);
    fetchQuotesByPage();
  };

  return (
    <Layout>
      {allQuotes ? (
        <>
          <ContentHeader>
            <TitleText>All Quotes</TitleText>
            <SortMenu />
          </ContentHeader>
          <Content>
            {allQuotes &&
              allQuotes.map(quote => (
                <Card
                  key={quote.id}
                  number={quote.id}
                  text={quote.text}
                  author={quote.authorName}
                />
              ))}
          </Content>
          <Footer>
            <StyledHR />
            <LoadButton isLoading={isFetching} handleClick={fetchQuotes} />
          </Footer>
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
  height: 120px;
  padding: 0 8%;
`;

const TitleText = styled.div`
  font-size: 22.5px;
  text-align: left;
  vertical-align: top;
  letter-spacing: -0.14px;
`;

const StyledHR = styled.hr`
  height: 1px;
  width: 100%;
  color: ${({ theme }) => theme.colors.solidLine};
  margin-left: auto;
  margin-right: auto;
`;

export default Index;
