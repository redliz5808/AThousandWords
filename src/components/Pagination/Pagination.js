import { Container, StyledButton } from "./page.styles";

const Pagination = (props) => {
  const handleClick = (e) => {
    props.handleClick(e.target.innerText);
  }
  return (
    <Container>
      <StyledButton onClick={handleClick}>Previous</StyledButton>
      <StyledButton onClick={handleClick}>1</StyledButton>
      <StyledButton onClick={handleClick}>2</StyledButton>
      <StyledButton onClick={handleClick}>3</StyledButton>
      <StyledButton onClick={handleClick}>4</StyledButton>
      <StyledButton onClick={handleClick}>Next</StyledButton>
    </Container>
  );
};

export default Pagination;
