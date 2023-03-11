import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  width: ${({ modal }) => (modal !== "" ? "100vw" : 0)};
  height: ${({ modal }) => (modal !== "" ? "100vh" : 0)};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 8;
`;

export const StyledModal = styled.div`
  position: fixed;
  //display: flex;
  //justify-content: center;

  border-radius: 10px;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.2);
  background-color: ${({ theme }) => theme.body};
  top: ${({ modal }) => (modal !== "" ? "50%" : "150%")};
  left: ${({ modal }) => (modal !== "" ? "50%" : "150%")};
  transform: translate(-50%, -50%);
  width: ${({ modal }) => (modal !== "" ? "80vw" : 0)};
  height: ${({ modal }) => (modal !== "" ? "60vh" : 0)};
  opacity: ${({ modal }) => (modal !== "" ? 1 : 0)};
  max-width: 30rem;
  z-index: 9;
  transition: all 0.5s;

  i {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 2rem;
    padding: 0.5rem;

    cursor: pointer;
  }

  h2 {
    text-transform: uppercase;
  }
`;
