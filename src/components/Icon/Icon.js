import { StyledSpan, StyledIcon } from "./icon.styles";

const convertedNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Icon = ({ icon, stats }) => {
  return (
    <StyledSpan>
      <StyledIcon>{icon}</StyledIcon>
      {convertedNumbers(stats)}
    </StyledSpan>
  );
};

export default Icon;
