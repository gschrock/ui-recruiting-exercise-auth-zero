import styled from "styled-components";

/**
 * Load button component for initiating fetch
 * of more quotes.
 */
const LoadButton = ({ className, handleClick, isLoading }) => (
  <button type="button" onClick={() => handleClick()} className={className}>
    <ButtonContent>
      <div
        className="spinner spinner-xs"
        style={isLoading ? {} : { visibility: "hidden" }}
      >
        <div className="circle"></div>
      </div>
      <ButtonText>Load more</ButtonText>
    </ButtonContent>
  </button>
);

const ButtonContent = styled.div`
  display: flex;
  justify-content: center;

  .spinner {
    padding-right: 1.5rem;
  }
`;

const ButtonText = styled.div`
  color: ${({ theme }) => theme.colors.buttonText};
  font-size: 16px;
  text-align: center;
  vertical-align: top;
  letter-spacing: 0.5px;
`;

const StyledLoadButton = styled(LoadButton)`
  background-color: ${({ theme }) => theme.colors.button};
  border-radius: 4px;
  width: 100%;
  height: 60px;
`;

export default StyledLoadButton;
