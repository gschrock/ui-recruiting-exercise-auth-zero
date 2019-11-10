import App from "next/app";
import React from "react";
import { ThemeProvider } from "styled-components";

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
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}
