import { useContext } from "react";
import styled from "styled-components";
import AppContext from "./AppContext";
import Select from "./Select";

const SortMenu = ({ className }) => {
  const {
    sortSelection,
    setSortSelection,
    isSortMenuOpen,
    setIsSortMenuOpen
  } = useContext(AppContext);
  return (
    <div className={className}>
      <Label>{"Sort by:"}</Label>
      <Select
        sort
        listItems={["Author: A-Z", "Author: Z-A"]}
        selection={sortSelection}
        setSelection={setSortSelection}
        isMenuOpen={isSortMenuOpen}
        setIsMenuOpen={setIsSortMenuOpen}
      />
    </div>
  );
};

const Label = styled.div`
  padding-right: 20px;
`;

const StyledSortMenu = styled(SortMenu)`
  display: flex;
  margin-left: auto;
  align-items: center;
  color: ${({ theme }) => theme.colors.subtleText};
`;

export default StyledSortMenu;
