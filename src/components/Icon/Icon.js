import { StyledSpan, StyledIcon, StyledButton } from "./icon.styles";

const convertedNumbers = (x) => {
  if (x !== undefined) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};

const Icon = (props) => {
  return (
    <StyledSpan>
      <StyledButton type={props.type}>
        <StyledIcon color={props.color} onClick={props.handleClick}>
          {props.icon}
        </StyledIcon>
      </StyledButton>
      <p>{convertedNumbers(props.stats)}</p>
    </StyledSpan>
  );
};

export default Icon;
