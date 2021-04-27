import { FaHeart } from "react-icons/fa";
import { StyledSpan } from "./likes.styles";

const Likes = ({ likes }) => {
  return (
    <StyledSpan>
      <FaHeart /> {likes}
    </StyledSpan>
  );
};

export default Likes;
