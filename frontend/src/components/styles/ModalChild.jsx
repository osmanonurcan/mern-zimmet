import styled from "styled-components";

export const ModalChildContainer = styled.div`
  display: flex;
  width: 90%;
  height: 90%;

  flex-direction: column;
  justify-content: space-between;
  margin: auto;
  margin-top: 2rem;
`;

export const ButtonContainer = styled.button`
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 10px;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  margin: 1rem 0;
  padding: 0.2rem;
`;

export const ScrollableContainer = styled.div`
  h3 {
    margin-top: 1rem;
  }
  input,
  textarea {
    width: 100%;
  }
  overflow: auto;
  height: 100%;
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.text};
    border-radius: 10px;
  }
  ::-webkit-scrollbar {
    height: 6px;
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.card};
    border-radius: 10px;
  }
`;

export const CategorySelect = styled.select`
  //width: 100%;

  width: 100%;
  padding: 0.2rem;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  border-radius: 10px;
  border-color: ${({ theme }) => theme.text};
`;

export const FieldContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  select {
    width: auto;
  }
`;

export const ModalInput = styled.input`
  border: 1px solid ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  border-radius: 10px;
  padding: 0.2rem;
  outline: none;
`;
export const ModalTextArea = styled.textarea`
  border: 1px solid ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  border-radius: 10px;
  padding: 0.2rem;
  outline: none;
`;
