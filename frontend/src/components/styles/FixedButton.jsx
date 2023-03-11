import styled from "styled-components";

export const FixedButton = styled.div`
  display: flex;
  position: fixed;
  bottom: ${({ isUp }) => (isUp ? "7rem" : "2rem")};
  right: 2rem;
  z-index: 1;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.2);
  background-color: ${({ theme }) => theme.body};
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    transform: scale(1.15);
  }

  i {
    font-size: 1.75rem;
  }
`;
