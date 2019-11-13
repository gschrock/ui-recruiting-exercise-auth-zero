import React from "react";
import styled from "styled-components";
import LoadButton from "../components/LoadButton";

const LoadMore = ({ isLoading, handleClick }) => (
  <>
    <StyledHR />
    <LoadButton isLoading={isLoading} handleClick={handleClick} />
  </>
);

const StyledHR = styled.hr`
  height: 1px;
  width: 100%;
  color: ${({ theme }) => theme.colors.solidLine};
  margin-left: auto;
  margin-right: auto;
`;

export default LoadMore;
