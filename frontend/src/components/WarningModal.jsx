import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";
import { Overlay, StyledModal } from "./styles/Modal";

export const WarningModal = ({ warningModal, closeWarningModal, children }) => {
  return (
    <>
      <Overlay onClick={closeWarningModal} modal={warningModal}></Overlay>
      <WarningStyledModal modal={warningModal}>
        <i onClick={closeWarningModal}>
          <AiOutlineClose />
        </i>
        {children}
      </WarningStyledModal>
    </>
  );
};

const WarningStyledModal = styled(StyledModal)`
  align-items: center;
  width: ${({ modal }) => (modal !== "" ? "15rem" : 0)};
  height: ${({ modal }) => (modal !== "" ? "10rem" : 0)};
`;
