import styled from "styled-components";

const Spinner = ({ className }) => {
  return (
    <div className={className}>
      <div className="spinner spinner-lg is-auth0">
        <div className="circle"></div>
      </div>
    </div>
  );
};

const StyledSpinner = styled(Spinner)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default StyledSpinner;
