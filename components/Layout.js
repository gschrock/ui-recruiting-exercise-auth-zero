import Head from "next/head";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import Footer from "./Footer";
import Header from "./Header";
import LoadButton from "./LoadButton";
import Select from "./Select";

/**
 * Layout acts as the data hydration point for the app,
 * so this is where we will fetch quotes.
 */
const Layout = props => {
  // The quotes we have for display.
  const [quotes, setQuotes] = useState(undefined);
  // Pagination data, includes pageSize and page.
  const [pagination, setPagination] = useState(undefined);
  // Tracking if we are currently fetching any new data
  // for displaying loading states.
  const [isFetching, setIsFetching] = useState(false);
  // Search select state.
  const [selection, setSelection] = useState("Author");
  const [isSearchMenuOpen, setIsSearchMenuOpen] = useState(false);
  // Search input state.
  const [searchInput, setSearchInput] = useState("");
  // Sort select state.
  const [sort, setSort] = useState("Author: A-Z");
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

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
      setQuotes(apiResponse.results);
    };
    fetchQuotes();
  }, []);

  const fetchQuotes = () => {
    const fetchQuotesByPage = async () => {
      let page = pagination.page;
      page = page + 1;

      const url = `https://auth0-exercise-quotes-api.herokuapp.com/api/quotes?pageSize=6&page=${page}`;
      const apiResponse = await fetch(url).then(response =>
        response.json().then(data => data)
      );

      const prefilteredQuotes = quotes.concat(apiResponse.results);
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
      setQuotes(dedupedQuotes);
      setIsFetching(false);
    };
    setIsFetching(true);
    fetchQuotesByPage();
  };

  return (
    <div
      className={props.className}
      onClick={() => {
        /**
         * Not the most elegant for handling a click
         * elsewhere on document closing any open menus,
         * but this achieves goal.
         */
        if (isSearchMenuOpen) setIsSearchMenuOpen(false);
        if (isSortMenuOpen) setIsSortMenuOpen(false);
      }}
    >
      {/**
       * Head allows us to append elements to the
       * <head> block of html.
       */}
      <Head>
        <title>Auth0 | Quotes</title>
        <script src="https://cdn.jsdelivr.net/npm/@auth0/cosmos@0.31.0/index.min.js"></script>
        <link
          rel="stylesheet"
          href="https://cdn.auth0.com/styleguide/core/2.0.5/core.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.auth0.com/styleguide/components/2.0.0/components.min.css"
        />
      </Head>
      <Header
        selection={selection}
        setSelection={setSelection}
        isSearchMenuOpen={isSearchMenuOpen}
        setIsSearchMenuOpen={setIsSearchMenuOpen}
      />
      {quotes ? (
        <>
          <ContentHeader>
            <TitleText>All Quotes</TitleText>
            <SortMenu>
              <Label>{"Sort by:"}</Label>
              <Select
                sort
                listItems={["Author: A-Z", "Author: Z-A"]}
                selection={sort}
                setSelection={setSort}
                isMenuOpen={isSortMenuOpen}
                setIsMenuOpen={setIsSortMenuOpen}
              />
            </SortMenu>
          </ContentHeader>
          <Content>
            {quotes &&
              quotes.map((quote, index) => (
                <Card
                  key={quote.id}
                  number={index + 1}
                  text={quote.text}
                  author={quote.author}
                />
              ))}
          </Content>
          <Footer>
            <StyledHR />
            <LoadButton isLoading={isFetching} handleClick={fetchQuotes} />
          </Footer>
        </>
      ) : (
        <Spinner>
          <div className="spinner spinner-lg is-auth0">
            <div className="circle"></div>
          </div>
        </Spinner>
      )}
    </div>
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

const SortMenu = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
  color: ${({ theme }) => theme.colors.subtleText};
`;

const Label = styled.div`
  padding-right: 20px;
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

const Spinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledLayout = styled(Layout)`
  height: 100%;
  width: 100%;
`;

export default StyledLayout;
