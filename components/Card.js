import styled from "styled-components";

/**
 * Card component for displaying a quote,
 * it's number, and author.
 */
const Card = ({ author, className, number, text }) => (
  <div className={className}>
    <QuoteNumber>{`QUOTE #${number}`}</QuoteNumber>
    <QuoteText>{`"${text}"`}</QuoteText>
    <QuoteAuthor>{author ? author : "No author"}</QuoteAuthor>
  </div>
);

// Text Style: Fakt/Desktop/Button 01
// Font Style: bold
const QuoteNumber = styled.div`
  font-size: 14px;
  letter-spacing: 1.5px;
  color: ${({ theme }) => theme.colors.subtleText};
`;

// Text Style: Fakt/Desktop/Body 02
// Font Style: medium
const QuoteText = styled.div`
  font-size: 20px;
  text-align: center;
  padding: 0px 40px;
  color: ${({ theme }) => theme.colors.quoteText};
`;

// Text Style: Fakt/Desktop/Body 04
// Font Style: medium
const QuoteAuthor = styled.div`
  font-size: 16px;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.colors.authorText};
`;

// shared Font Family: Fakt ProUI
const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 1rem;
  background-color: #ffffff;
  width: 376px;
  height: 308px;
  border-radius: 4px;
  filter: drop-shadow(10px 0px 5px rgba(0, 0, 0, 0.1));
`;

export default StyledCard;