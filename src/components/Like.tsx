import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface Props {
  initLiked: boolean;
  onClick: (liked: boolean) => void;
}

const Like = ({ initLiked, onClick }: Props) => {
  const [liked, setLiked] = useState(initLiked);

  const toggle = () => {
    setLiked(!liked);
    onClick(!liked);
  };

  if (liked) return <AiFillHeart color="#ff6b81" size="20" onClick={toggle} />;
  return <AiOutlineHeart size="20" onClick={toggle} />;
};

export default Like;
