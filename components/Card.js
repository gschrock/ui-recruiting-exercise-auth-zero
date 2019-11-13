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

const QuoteNumber = styled.div`
  padding: 20px 0px 10px 0px;
  font-weight: bold;
  font-size: 14px;
  letter-spacing: 1.5px;
  color: ${({ theme }) => theme.colors.subtleText};
`;

const QuoteText = styled.p`
  padding: 0px 40px 47px 40px;
  font-size: 20px;
  text-align: center;
  padding: 0px 40px;
  color: ${({ theme }) => theme.colors.quoteText};
`;

const QuoteAuthor = styled.div`
  padding-top: 10px;
  font-size: 16px;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.colors.authorText};
`;

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  margin-bottom: 2.5rem;
  width: 100%;
  height: 308px;
  border-radius: 4px;
  filter: drop-shadow(0px 5px 10px rgba(0, 0, 0, 0.1));
`;

export default StyledCard;
