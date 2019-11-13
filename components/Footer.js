import styled from "styled-components";

const Footer = ({ children, className }) => (
  <footer className={className}>{children}</footer>
);

const StyledFooter = styled(Footer)`
  padding: 0 8%;
  margin-bottom: 116px;
  color: black;
  width: 100%;
  height: 60px;
`;

export default StyledFooter;
