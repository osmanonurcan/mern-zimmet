import { AiOutlineClose } from "react-icons/ai";
import { Overlay, StyledModal } from "./styles/Modal";

export const Modal = ({ modal, closeModal, children }) => {
  return (
    <>
      <Overlay onClick={closeModal} modal={modal}></Overlay>
      <StyledModal modal={modal}>
        <i onClick={closeModal}>
          <AiOutlineClose />
        </i>
        {children}
      </StyledModal>
    </>
  );
};
