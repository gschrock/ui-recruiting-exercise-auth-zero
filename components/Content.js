import React from "react";
import styled from "styled-components";
import Card from "../components/Card";

const Content = ({ className, quotes, quoteCardType }) => (
  <article className={className}>
    {quotes &&
      quotes.map((quote, index) => (
        <Card
          key={quote.id}
          number={quote.id}
          text={quote.text}
          author={quote.authorName}
          index={index}
          quoteCardType={quoteCardType}
        />
      ))}
  </article>
);

const StyledContent = styled(Content)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 376px));
  justify-items: center;
  justify-content: space-between;
  padding: 0 8%;
`;

export default StyledContent;
