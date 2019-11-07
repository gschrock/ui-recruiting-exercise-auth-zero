import styled from "styled-components";

const Footer = ({ className }) => <div className={className}>Footer</div>;

const StyledFooter = styled(Footer)`
  background-color: ${({ theme }) => theme.colors.background};
  color: black;
  width: 100%;
  height: 60px;
`;

export default StyledFooter;
