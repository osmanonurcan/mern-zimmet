import { AiFillFilter } from "react-icons/ai";
import * as S from "./styles/FixedButton";

export const FilterButton = ({ onClick, isUp }) => {
  return (
    <S.FixedButton onClick={onClick} isUp={isUp}>
      <i>
        <AiFillFilter />
      </i>
    </S.FixedButton>
  );
};
