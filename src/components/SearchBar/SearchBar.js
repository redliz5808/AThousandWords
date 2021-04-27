import { StyledInput } from "./searchBar.styles";

const onSubmitHandler = (e) => {
  e.preventDefault();
};

const SearchBar = () => {
  return (
    <form onSubmit={onSubmitHandler}>
      <StyledInput placeholder="Search" />
    </form>
  );
};

export default SearchBar;
