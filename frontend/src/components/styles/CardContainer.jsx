import styled from "styled-components";

export const CardContainer = styled.section`
  margin: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: flex-start;

  @media (min-width: 768px) {
    justify-content: ${({ cardsAmount }) =>
      cardsAmount < 2 ? "center" : "flex-start"};
  }

  @media (min-width: 992px) {
    justify-content: ${({ cardsAmount }) =>
      cardsAmount < 3 ? "center" : "flex-start"};
  }

  @media (min-width: 1200px) {
    justify-content: ${({ cardsAmount }) =>
      cardsAmount < 4 ? "center" : "flex-start"};
  }
`;
