import styled from "styled-components";
import { Input } from "../components/styles/Input";

export const Login = () => {
  return (
    <S.FlexContainer>
      <S.LoginFormContainer>
        <S.LoginForm>
          <h1>Login</h1>
          <S.Input type="text" placeholder="Username" />
          <S.Input type="password" placeholder="Password" />
          <button type="submit">LOGIN</button>
        </S.LoginForm>
      </S.LoginFormContainer>
    </S.FlexContainer>
  );
};

// STYLED COMPONENTS

const S = {};

S.FlexContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

S.LoginFormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20rem;
  height: 25rem;
  box-shadow: 0 0px 40px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: ${({ theme }) => theme.card};

  @media (min-width: 768px) {
    width: 25rem;
    height: 30rem;
  }
`;

S.LoginForm = styled.form`
  width: 100%;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  button {
    padding: 0.5rem;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    border: 1px solid transparent;
    cursor: pointer;
    &:hover {
      border: 1px solid ${({ theme }) => theme.text};
    }
  }
`;

S.Input = styled(Input)`
  color: ${({ theme }) => theme.text};
`;
