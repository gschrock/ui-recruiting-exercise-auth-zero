import App from "next/app";
import React from "react";
import { ThemeProvider } from "styled-components";
import AppContext from "../components/AppContext";

/**
 * Some redundant color definitions here, but
 * keeping as is for now. There could be a good
 * argument made for making the names more
 * general.
 */
const theme = {
  colors: {
    background: "#E5E5E5",
    authorText: "#606060",
    subtleText: "#A5A8A8",
    quoteText: "#EB5424",
    button: "#E3E5E7",
    buttonText: "#606060",
    solidLine: "#E3E5E7"
  }
};

export default class MyApp extends App {
  state = {
    // The all quotes view quotes.
    allQuotes: undefined,
    // Pagination data, includes pageSize and page.
    pagination: undefined,
    // Count of allQuotes pre-dedupe by id.
    allQuotesCount: 0,
    // The search quotes view quotes.
    searchQuotes: undefined,
    // Pagination data for search quotes.
    searchPagination: undefined,
    // Count of searchQuotes pre-dedupe by id.
    searchQuotesCount: 0,
    // Search select dropdown state.
    selection: "Author",
    /**
     * @todo use this with a sort function in search
     * and all quotes views.
     */
    // Sort selection for quote "sort by" dropdown.
    sortSelection: "Author: A-Z",
    // Tracks search input by user.
    searchInput: "",
    // Tracks search and sort dropdown menu open state.
    isSearchMenuOpen: false,
    isSortMenuOpen: false,
    // Tracking if we are currently fetching any new data
    // for displaying loading states.
    isFetching: false
  };

  componentDidMount = () => {};

  /**
   * @todo It would be nice to DRY this up.
   * May not get around to it.
   */
  setAllQuotes = allQuotes => {
    this.setState({
      allQuotes
    });
  };

  setPagination = pagination => {
    this.setState({
      pagination
    });
  };

  setAllQuotesCount = allQuotesCount => {
    this.setState({
      allQuotesCount
    });
  };

  setSearchQuotes = searchQuotes => {
    this.setState({
      searchQuotes
    });
  };

  setSearchPagination = searchPagination => {
    this.setState({
      searchPagination
    });
  };

  setSearchQuotesCount = searchQuotesCount => {
    this.setState({
      searchQuotesCount
    });
  };

  setSelection = selection => {
    this.setState({
      selection
    });
  };

  setSortSelection = sortSelection => {
    this.setState({
      sortSelection
    });
  };

  setSortSelection = sortSelection => {
    this.setState({
      sortSelection
    });
  };

  setIsSearchMenuOpen = isSearchMenuOpen => {
    this.setState({
      isSearchMenuOpen
    });
  };

  setSearchInput = searchInput => {
    this.setState({
      searchInput
    });
  };

  setIsSortMenuOpen = isSortMenuOpen => {
    this.setState({
      isSortMenuOpen
    });
  };

  setIsFetching = isFetching => {
    this.setState({ isFetching });
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <AppContext.Provider
        value={{
          allQuotes: this.state.allQuotes,
          setAllQuotes: this.setAllQuotes,
          pagination: this.state.pagination,
          setPagination: this.setPagination,
          allQuotesCount: this.state.allQuotesCount,
          setAllQuotesCount: this.setAllQuotesCount,
          searchQuotes: this.state.searchQuotes,
          setSearchQuotes: this.setSearchQuotes,
          searchPagination: this.state.searchPagination,
          setSearchPagination: this.setSearchPagination,
          searchQuotesCount: this.state.searchQuotesCount,
          setSearchQuotesCount: this.setSearchQuotesCount,
          selection: this.state.selection,
          setSelection: this.setSelection,
          sortSelection: this.state.sortSelection,
          setSortSelection: this.setSortSelection,
          isSearchMenuOpen: this.state.isSearchMenuOpen,
          setIsSearchMenuOpen: this.setIsSearchMenuOpen,
          searchInput: this.state.searchInput,
          setSearchInput: this.setSearchInput,
          isSortMenuOpen: this.state.isSortMenuOpen,
          setIsSortMenuOpen: this.setIsSortMenuOpen,
          isFetching: this.state.isFetching,
          setIsFetching: this.setIsFetching
        }}
      >
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </AppContext.Provider>
    );
  }
}
