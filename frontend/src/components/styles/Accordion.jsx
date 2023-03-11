import styled from "styled-components";

export const AccordionContainer = styled.div`
  margin: 1rem 0;
  transition: all 0.5s;
  width: 100%;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background-color: ${({ theme }) => theme.card};
`;

export const AccordionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2,
  i {
    text-transform: capitalize;

    padding: 0.5rem;
  }

  h2 {
    flex-grow: 1;
    cursor: pointer;
    overflow-y: auto;
    white-space: nowrap;
    -ms-overflow-style: none;
    scrollbar-width: none;
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
  }

  i {
    margin: 0 0.3rem;
    cursor: pointer;
  }
`;

export const AccordionInfo = styled.div`
  position: relative;
  padding: ${({ isOpen }) => (isOpen ? "0.5rem" : 0)};
  height: ${({ isOpen, infoHeight }) => (isOpen ? infoHeight : 0)};
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: all 0.5s;
  overflow: hidden;
`;

export const Buttons = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  i {
    padding: 0 0.3rem;
    font-size: 1.5rem;
    cursor: pointer;
  }
`;

export const Info = styled.div`
  padding: 0.3rem 0;
  span {
    text-transform: capitalize;
    margin-right: 0.5rem;
    padding: 0.1rem 0.5rem;
  }
`;
