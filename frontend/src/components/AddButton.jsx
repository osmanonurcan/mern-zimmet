import { AiOutlinePlus } from "react-icons/ai";
import * as S from "./styles/FixedButton";

export const AddButton = ({ onClick }) => {
  return (
    <S.FixedButton onClick={onClick}>
      <i>
        <AiOutlinePlus />
      </i>
    </S.FixedButton>
  );
};
