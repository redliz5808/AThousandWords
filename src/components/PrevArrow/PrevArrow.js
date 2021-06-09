import { MainContainer } from "./prevArrow.styles";
import { FaArrowCircleLeft } from "react-icons/fa";

const PrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <MainContainer className={className} onClick={onClick}>
      <FaArrowCircleLeft />
    </MainContainer>
  );
};

export default PrevArrow;
