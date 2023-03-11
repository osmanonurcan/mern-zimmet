import { createGlobalStyle } from "styled-components";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const styled = { createGlobalStyle };

export const GlobalStyles = styled.createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: "Roboto";
    transition: background-color 0.5s linear, color 0.5s linear;

    a {
      color: ${({ theme }) => theme.text};
      text-decoration: none;
    }
    li {
      list-style: none;
    }

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
`;
