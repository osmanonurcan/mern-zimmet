import styled from "styled-components";

import { Input } from "../components/styles/Input";

export const SearchBar = ({ handleChange, search }) => {
  return (
    <S.Search
      type="search"
      placeholder="Search..."
      onChange={handleChange}
      value={search}
    />
  );
};

// STYLED COMPONENTS

const S = {};

S.Search = styled(Input)`
  margin: 2rem 2rem 1rem 2rem;

  width: calc(100% - 4rem);
  max-width: 30rem;
  border: 1px solid ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.text};
`;
