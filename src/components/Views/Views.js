import { FaEye } from "react-icons/fa";
import { StyledSpan } from "./views.styles";

const convertedNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Views = ({ views }) => {
  return (
    <StyledSpan>
      <FaEye /> {convertedNumbers(views)}
    </StyledSpan>
  );
};

export default Views;
