import { StyledSpan, StyledIcon, StyledButton } from "./icon.styles";

const convertedNumbers = (x) => {
  if (x !== undefined) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};

const Icon = (props) => {
  const handleFavoriteClick = () => {
    props.handleFavoriteClick(props.id);
  };

  return (
    <StyledSpan>
      <StyledButton color={props.color} onClick={handleFavoriteClick}>
        <StyledIcon>{props.icon}</StyledIcon>
      </StyledButton>
      {convertedNumbers(props.stats)}
    </StyledSpan>
  );
};

export default Icon;
