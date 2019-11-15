import Link from "next/link";
import { useContext } from "react";
import styled from "styled-components";
import AppContext from "../components/AppContext";
import Layout from "../components/Layout";
import "./index.scss";

/**
 * Ideas...
 * @todo detail view can display card dot selectors
 * on bottom of this view (number can correspond to
 * number of cards loaded?). Each dot will probably
 * be a link to an individual card.
 */
const DetailView = props => {
  const {
    allQuotes,
    searchQuotes,
    quoteCardType,
    // setQuoteCardType,
    quoteDetailIndex
    // setQuoteDetailIndex
  } = useContext(AppContext);
  const quotesToDetail = quoteCardType === "all" ? allQuotes : searchQuotes;
  const previousViewRoute = quoteCardType === "all" ? "/" : "/searchResults";
  /**
   * NOTE!!!
   * Might not even need this handling, for each item increment + 1 unless its the last,
   * Or - 1 unless its the last
   */
  // quoteDetailIndex - 1 >= 0 ? quoteDetailIndex - 1 : quotesToDetail.length - 1
  // quoteDetailIndex + 1 <= quotesToDetail.length ? quoteDetailIndex + 1 : ???
  const prevQuoteDetailIndex = quoteDetailIndex && quoteDetailIndex - 1;
  const nextQuoteDetailIndex = quoteDetailIndex && quoteDetailIndex + 1;
  if (
    (quoteCardType === "all" && !allQuotes) ||
    (quoteCardType === "search" && !searchQuotes)
  ) {
    return null;
  }
  return (
    <Layout>
      <>
        <ContentHeader>
          <Link href={previousViewRoute}>
            <GoBackLink>
              <Icon className={"icon-budicon-521 icon"} />
              <div>Go Back</div>
            </GoBackLink>
          </Link>
        </ContentHeader>
        <DetailCardContainer>
          <div>
            <DetailCardSide>
              <QuoteNumberSide>{`QUOTE #${quotesToDetail[prevQuoteDetailIndex].id}`}</QuoteNumberSide>
              <QuoteTextSide>{`"${quotesToDetail[prevQuoteDetailIndex].text}"`}</QuoteTextSide>
              <QuoteAuthorSide>
                {quotesToDetail[prevQuoteDetailIndex].authorName
                  ? quotesToDetail[prevQuoteDetailIndex].authorName
                  : "No author"}
              </QuoteAuthorSide>
            </DetailCardSide>
          </div>
          <div>
            <DetailCardMain>
              <QuoteNumberMain>{`QUOTE #${quotesToDetail[quoteDetailIndex].id}`}</QuoteNumberMain>
              <QuoteTextMain>{`"${quotesToDetail[quoteDetailIndex].text}"`}</QuoteTextMain>
              <QuoteAuthorMain>
                {quotesToDetail[quoteDetailIndex].authorName
                  ? quotesToDetail[quoteDetailIndex].authorName
                  : "No author"}
              </QuoteAuthorMain>
            </DetailCardMain>
          </div>
          <div>
            <DetailCardSide>
              <QuoteNumberSide>{`QUOTE #${quotesToDetail[nextQuoteDetailIndex].id}`}</QuoteNumberSide>
              <QuoteTextSide>{`"${quotesToDetail[nextQuoteDetailIndex].text}"`}</QuoteTextSide>
              <QuoteAuthorSide>
                {quotesToDetail[nextQuoteDetailIndex].authorName
                  ? quotesToDetail[nextQuoteDetailIndex].authorName
                  : "No author"}
              </QuoteAuthorSide>
            </DetailCardSide>
          </div>
        </DetailCardContainer>
        {/**
         * Cards depending on which card was clicked.
         */}
        {/**
         * Card dot selectors to cycle through them by INDEX.
         */}
      </>
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

const DetailCardContainer = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DetailCardMain = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  margin: 32px;
  width: 782px;
  height: 641px;
  border-radius: 4px;
  filter: drop-shadow(0px 5px 10px rgba(0, 0, 0, 0.1));
`;

const DetailCardSide = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  margin: 32px;
  width: 652px;
  height: 534px;
  border-radius: 4px;
  filter: drop-shadow(0px 5px 10px rgba(0, 0, 0, 0.1));
`;

const QuoteNumberMain = styled.h1`
  padding: 20px 0px 10px 0px;
  font-weight: bold;
  font-size: 29px;
  letter-spacing: 3.12px;
  color: ${({ theme }) => theme.colors.subtleText};
  /* overwrite default h1 margin */
  margin: 0px;
`;

const QuoteTextMain = styled.p`
  font-size: 42px;
  text-align: center;
  padding: 0px 40px;
  color: ${({ theme }) => theme.colors.quoteText};
  /* overwrite default p margin */
  margin: 0px;
`;

const QuoteAuthorMain = styled.h1`
  padding-top: 10px;
  font-size: 33px;
  letter-spacing: 1.04px;
  color: ${({ theme }) => theme.colors.authorText};
  /* overwrite default h1 margin */
  margin: 0px;
`;

const QuoteNumberSide = styled.h1`
  padding: 20px 0px 10px 0px;
  font-weight: bold;
  font-size: 24px;
  letter-spacing: 2.6px;
  color: ${({ theme }) => theme.colors.subtleText};
  /* overwrite default h1 margin */
  margin: 0px;
`;

const QuoteTextSide = styled.p`
  font-size: 35px;
  text-align: center;
  padding: 0px 40px;
  color: ${({ theme }) => theme.colors.quoteText};
  /* overwrite default p margin */
  margin: 0px;
`;

const QuoteAuthorSide = styled.h1`
  padding-top: 10px;
  font-size: 28px;
  letter-spacing: 0.87px;
  color: ${({ theme }) => theme.colors.authorText};
  /* overwrite default h1 margin */
  margin: 0px;
`;

export default DetailView;
