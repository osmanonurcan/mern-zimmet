import styled from "styled-components";

export const Section = styled.section`
  width: 100%;

  justify-content: center;
  align-items: center;
  display: flex;
  flex-wrap: wrap;

  h1 {
    text-align: center;
    margin: 3rem;
    text-transform: uppercase;
  }
`;

export const SectionCenter = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;

  width: 95%;
  height: 80%;
`;

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  padding: 0 1rem;

  @media (min-width: 768px) {
    width: 50%;
  }
`;

export const OneColumnContainer = styled(ColumnContainer)`
  @media (min-width: 768px) {
    width: 100%;
  }
`;
