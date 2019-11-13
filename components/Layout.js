import Head from "next/head";
import React, { useContext } from "react";
import styled from "styled-components";
import AppContext from "./AppContext";
import Header from "./Header";

const Layout = ({ className, children }) => {
  const {
    isSearchMenuOpen,
    setIsSearchMenuOpen,
    isSortMenuOpen,
    setIsSortMenuOpen
  } = useContext(AppContext);
  return (
    <main
      className={className}
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
        <link
          rel="stylesheet"
          href="https://cdn.auth0.com/styleguide/core/2.0.5/core.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.auth0.com/styleguide/components/2.0.0/components.min.css"
        />
      </Head>
      <Header />
      {children}
    </main>
  );
};

const StyledLayout = styled(Layout)`
  height: 100%;
  width: 100%;
`;

export default StyledLayout;
