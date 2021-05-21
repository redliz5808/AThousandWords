import { StyledSpan, StyledIcon, StyledButton } from "./icon.styles";

const convertedNumbers = (x) => {
  if (x !== undefined) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};

const Icon = (props) => {
  console.log(props.icon.type)
  return (
    <StyledSpan>
      <StyledButton type={props.type}>
        <StyledIcon color={props.color} onClick={props.handleClick}>
          {props.icon}
        </StyledIcon>
      </StyledButton>
      {convertedNumbers(props.stats)}
    </StyledSpan>
  );
};

export default Icon;
