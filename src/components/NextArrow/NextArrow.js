import { MainContainer } from "./nextArrow.styles";
import { FaArrowCircleRight } from "react-icons/fa";

const NextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <MainContainer className={className} onClick={onClick}>
      <FaArrowCircleRight />
    </MainContainer>
  );
};

export default NextArrow;
