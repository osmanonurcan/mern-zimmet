import styled from "styled-components";
import { AiFillDelete, AiFillEdit, AiFillTool } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export const DeviceCard = ({
  _id,
  make,
  model,
  category,
  img,
  specs,
  owner,
  setWarningModal,
  setModal,
  setClickedDeviceId,
}) => {
  const navigate = useNavigate();
  return (
    <S.Card>
      <div onClick={() => navigate(`/detail/${_id}`)}>
        <S.CardImg
          src={img ? `data:image/jpeg;base64,${img}` : "laptopjpg.jpg"}
          alt=""
        />
        <S.CardInfo>
          <h3>{make}</h3>
          <h2>{model}</h2>
          <h3>{owner}</h3>
        </S.CardInfo>
      </div>
      <S.ButtonsContainer>
        <S.ServiceIcon
          onClick={() => {
            setClickedDeviceId(_id);
            setModal("service");
          }}
        >
          <AiFillTool />
        </S.ServiceIcon>
        <i
          onClick={() => {
            setClickedDeviceId(_id);
            setModal("update");
          }}
        >
          <AiFillEdit />
        </i>
        <i
          onClick={() => {
            setClickedDeviceId(_id);
            setWarningModal("delete");
          }}
        >
          <AiFillDelete />
        </i>
      </S.ButtonsContainer>
    </S.Card>
  );
};

// STYLED COMPONENTS

const S = {};

S.ServiceIcon = styled.i`
  flex: 1;
`;

S.ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  height: 3rem;
  i {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.2rem;
    font-size: 1.5rem;
    margin: 0 0.5rem;
    border: 1px solid ${({ theme }) => theme.text};
    border-radius: 10px;
  }
`;

S.Card = styled.article`
  width: 100%;
  transition: all 0.5s;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  cursor: pointer;
  text-align: left;
  background-color: ${({ theme }) => theme.card};

  @media (min-width: 768px) {
    width: calc(50% - 1rem);
  }

  @media (min-width: 992px) {
    width: calc(33.3333% - 1.3333rem);
  }

  @media (min-width: 1200px) {
    width: calc(25% - 1.5rem);
  }

  &:hover {
    transform: scale(1.05);
  }
`;

S.CardImg = styled.img`
  border-radius: 10px 10px 0 0;
  width: 100%;
  height: 8rem;
  object-fit: contain;
`;

S.CardInfo = styled.div`
  padding: 0.5rem;

  h2,
  h3 {
    overflow: auto;

    ::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.text};
      border-radius: 10px;
    }
    ::-webkit-scrollbar {
      height: 6px;
    }

    ::-webkit-scrollbar-track {
      background-color: ${({ theme }) => theme.card};
      border-radius: 10px;
    }
  }
`;
