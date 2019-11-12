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

const SearchResultsView = () => {
  const {
    searchQuotes,
    setSearchQuotes,
    searchPagination,
    setSearchPagination,
    selection,
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
      setSearchPagination(apiResponse.pagination);
      setSearchQuotes(dedupedQuotes);
      setIsFetching(false);
    };
    setIsFetching(true);
    fetchQuotesByPage();
  };

  return (
    <Layout>
      {searchQuotes ? (
        <>
          <ContentHeader>
            <TitleText>Go back</TitleText>
            <SortMenu />
          </ContentHeader>
          <ResultText>{`We found ${searchPagination &&
            searchPagination.rowCount} results`}</ResultText>
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

const ResultText = styled.div`
  padding: 0 8%;
`;

const StyledHR = styled.hr`
  height: 1px;
  width: 100%;
  color: ${({ theme }) => theme.colors.solidLine};
  margin-left: auto;
  margin-right: auto;
`;

export default SearchResultsView;
