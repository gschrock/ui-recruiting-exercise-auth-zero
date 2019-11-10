import styled from "styled-components";

const Footer = ({ children, className }) => (
  <div className={className}>{children}</div>
);

const StyledFooter = styled(Footer)`
  padding: 0 8%;
  margin-bottom: 116px;
  background-color: ${({ theme }) => theme.colors.background};
  color: black;
  width: 100%;
  height: 60px;
`;

export default StyledFooter;
