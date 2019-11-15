import { withRouter } from "next/router";
import React, { useContext } from "react";
import styled from "styled-components";
import AppContext from "./AppContext";

const Select = ({
  className,
  router,
  listItems,
  sort = false,
  selection,
  setSelection,
  isMenuOpen,
  setIsMenuOpen,
  updateSearchSelection
}) => {
  const { allQuotes, setAllQuotes, searchQuotes, setSearchQuotes } = useContext(
    AppContext
  );
  // "Author: A-Z", "Author: Z-A"
  const updateSortSelection = item => {
    if (item === "Author: A-Z") {
      allQuotes &&
        setAllQuotes(
          allQuotes.sort((a, b) => a.authorName.localeCompare(b.authorName))
        );
      searchQuotes &&
        setSearchQuotes(
          searchQuotes.sort((a, b) => a.authorName.localeCompare(b.authorName))
        );
    }
    if (item === "Author: Z-A") {
      allQuotes &&
        setAllQuotes(
          allQuotes.sort((a, b) => b.authorName.localeCompare(a.authorName))
        );
      searchQuotes &&
        setSearchQuotes(
          searchQuotes.sort((a, b) => b.authorName.localeCompare(a.authorName))
        );
    }
  };

  const getListItems = () => {
    const filteredItems = listItems.filter(item => item !== selection);
    return filteredItems.map(item => (
      <ListItem
        key={item}
        onClick={() => {
          setSelection(item);
          setIsMenuOpen(!isMenuOpen);
          updateSearchSelection && updateSearchSelection(item);
          sort && updateSortSelection(item);
        }}
      >
        {item}
      </ListItem>
    ));
  };

  /**
   * Disable select component while on detail view. It does not
   * make sense to change the selection type here and it causes
   * an error.
   */
  const disableForDetailRoute = router.pathname === "/detailView";

  return (
    <div
      className={className}
      style={disableForDetailRoute ? { cursor: "not-allowed" } : {}}
    >
      <SelectButton
        onClick={() => !disableForDetailRoute && setIsMenuOpen(!isMenuOpen)}
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
  cursor: pointer;
  color: #000;
  text-decoration: none;
  padding: 8px 16px;
  border-bottom: 1px solid #f9f9fb;

  :last-child {
    border-bottom: none;
  }
`;

const StyledSelect = styled(Select)`
  cursor: pointer;
  margin-left: auto;
  color: ${({ theme }) => theme.colors.subtleText};
`;

export default withRouter(StyledSelect);
