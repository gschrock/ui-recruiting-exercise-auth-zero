import Head from "next/head";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import Footer from "./Footer";
import Header from "./Header";

/**
 * Layout acts as the data hydration point for the app,
 * so this is where we will fetch quotes.
 */
const Layout = props => {
  // The quotes we have for display.
  const [quotes, setQuotes] = useState(undefined);
  const [pagination, setPagination] = useState(undefined);

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

  return (
    <div className={props.className}>
      {/**
       * Head allows us to append elements to the
       * <head> block of html.
       */}
      <Head>
        <title>Auth0 | Quotes</title>
      </Head>
      <Header />
      <Content>
        {quotes ? (
          quotes.map((quote, index) => (
            <Card
              key={quote.id}
              number={index + 1}
              text={quote.text}
              author={quote.author}
            />
          ))
        ) : (
          <div>Loading...</div>
        )}
      </Content>
      <Footer />
    </div>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const StyledLayout = styled(Layout)`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

export default StyledLayout;
