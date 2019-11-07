import styled from "styled-components";

/**
 * Header will contain app title and search
 * component.
 */
const Header = ({ className }) => (
  <div className={className}>Auth0 | Quotes</div>
);

const StyledHeader = styled(Header)`
  background-color: #ffffff;
  color: black;
  width: 100%;
  height: 50px;
`;

export default StyledHeader;
