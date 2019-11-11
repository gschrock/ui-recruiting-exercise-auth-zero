import React from "react";
import styled from "styled-components";

const Select = ({
  className,
  listItems,
  selection,
  setSelection,
  isMenuOpen,
  setIsMenuOpen,
  sort = false
}) => {
  const getListItems = () => {
    const filteredItems = listItems.filter(item => item !== selection);
    return filteredItems.map(item => (
      <ListItem
        key={item}
        onClick={() => {
          setSelection(item);
          setIsMenuOpen(!isMenuOpen);
        }}
      >
        {item}
      </ListItem>
    ));
  };
  return (
    <div className={className}>
      <SelectButton
        onClick={e => setIsMenuOpen(!isMenuOpen)}
        style={
          sort
            ? { borderRadius: "4px", width: "148px", backgroundColor: "white" }
            : { borderRadius: "4px 0px 0px 4px" }
        }
      >
        <div>{selection}</div>
        <Icon
          className={`${
            isMenuOpen ? "icon-budicon-462" : "icon-budicon-460"
          } icon`}
        />
      </SelectButton>

      {isMenuOpen ? (
        <List style={sort ? { width: "148px" } : {}}>{getListItems()}</List>
      ) : null}
    </div>
  );
};

const SelectButton = styled.div`
  display: flex;
  align-items: center;
  width: 112px;
  height: 40px;
  background-color: #f9f9fb;
  padding: 9px;
  border: 1px ${({ theme }) => theme.colors.subtleText} solid;
  font-size: 16px;
  letter-spacing: 0.5px;
`;

const Icon = styled.i`
  margin-left: auto;
  padding-top: 8px;
`;

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 112px;
  background-color: white;
  position: absolute;
  font-size: 16px;
  letter-spacing: 0.5px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const ListItem = styled.li`
  color: #000;
  text-decoration: none;
  padding: 8px 16px;
  border-bottom: 1px solid #f9f9fb;

  :last-child {
    border-bottom: none;
  }
  :hover {
    background-color: #f9f9fb;
    color: white;
  }
`;

const StyledSelect = styled(Select)`
  margin-left: auto;
  color: ${({ theme }) => theme.colors.subtleText};
`;

export default StyledSelect;
