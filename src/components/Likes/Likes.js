import { FaHeart } from "react-icons/fa";
const Likes = ({ likes }) => {
  return (
    <div>
      <FaHeart /> {likes}
    </div>
  );
};

export default Likes;
