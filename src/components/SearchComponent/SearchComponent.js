import { StyledInput } from "./searchComponent.styles";

const onSubmitHandler = (e) => {
  e.preventDefault();
};

const SearchComponent = () => {
  return (
    <form onSubmit={onSubmitHandler}>
      <StyledInput placeholder="Search" />
    </form>
  );
};

export default SearchComponent;
