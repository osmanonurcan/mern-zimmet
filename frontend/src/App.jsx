import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import styled from "styled-components";
import { Home } from "./pages/Home";
import { Service } from "./pages/Service";
import { Stock } from "./pages/Stock";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../global";
import { useDarkMode } from "./components/useDarkMode";
import { lightTheme, darkTheme } from "../theme";
import { Login } from "./pages/Login";
import { AppProvider } from "../context";
import { NotifyContainer } from "../notify";
import { Detail } from "./pages/Detail";

function App() {
  const [theme, themeToggler] = useDarkMode();

  const themeMode = theme === "light" ? lightTheme : darkTheme;

  return (
    <AppProvider>
      <ThemeProvider theme={themeMode}>
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout {...{ themeToggler, theme }} />}>
              <Route index element={<Home />} />
              <Route path="service" element={<Service />} />
              <Route path="stock" element={<Stock />} />
              <Route path="detail/:id" element={<Detail />} />
            </Route>
          </Routes>
          <NotifyContainer />
        </BrowserRouter>
      </ThemeProvider>
    </AppProvider>
  );
}

// COMPONENTS

const Layout = ({ themeToggler, theme }) => {
  return (
    <>
      <Navbar {...{ themeToggler, theme }} />
      <Outlet />
    </>
  );
};

const Navbar = ({ themeToggler, theme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <S.Navbar>
        <S.HamburgerMenu>
          <S.Hamburger onClick={toggleMenu}>
            <RxHamburgerMenu />
          </S.Hamburger>
        </S.HamburgerMenu>
        <S.LeftMenu>
          <S.MenuItem>
            <Link to="/">Home</Link>
          </S.MenuItem>
          <S.MenuItem>
            <Link to="/stock">Stock</Link>
          </S.MenuItem>
          <S.MenuItem>
            <Link to="/service">Service</Link>
          </S.MenuItem>
        </S.LeftMenu>
        <S.Logo>
          <Link to="/">LOGO</Link>
        </S.Logo>
        <S.RightMenu>
          <CheckBoxWrapper>
            <CheckBox
              id="checkbox"
              type="checkbox"
              onChange={themeToggler}
              checked={theme === "light" ? false : true}
            />
            <CheckBoxLabel htmlFor="checkbox" />
          </CheckBoxWrapper>
          <S.Logout>LOGOUT</S.Logout>
        </S.RightMenu>
      </S.Navbar>

      <S.DropdownMenu isMenuOpen={isMenuOpen}>
        <S.DropdownMenuItem>
          <Link to="/" onClick={toggleMenu}>
            Home
          </Link>
        </S.DropdownMenuItem>
        <S.DropdownMenuItem>
          <Link to="/stock" onClick={toggleMenu}>
            Stock
          </Link>
        </S.DropdownMenuItem>

        <S.DropdownMenuItem>
          <Link to="/service" onClick={toggleMenu}>
            Service
          </Link>
        </S.DropdownMenuItem>
      </S.DropdownMenu>
    </>
  );
};

// STYLED COMPONENTS

const S = {};

S.Navbar = styled.nav`
  height: 3rem;
  border: 1px solid rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    text-transform: uppercase;
  }
`;

S.HamburgerMenu = styled.div`
  font-size: 1.5rem;
  flex: 1;
  text-align: center;
  @media (min-width: 768px) {
    display: none;
  }
`;

S.Hamburger = styled.i`
  padding: 0.5rem;
`;

S.Logo = styled.div`
  font-size: 1.5rem;
  flex: 1;
  text-align: center;
`;

S.LeftMenu = styled.ul`
  display: none;
  flex: 1;
  justify-content: center;

  @media (min-width: 768px) {
    display: flex;
  }
`;

S.RightMenu = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
  flex: 1;
  text-transform: uppercase;

  @media (min-width: 768px) {
    gap: 1rem;
  }
`;

S.MenuItem = styled.li`
  a {
    padding: 0.5rem 1rem;
  }
`;

S.DropdownMenu = styled.ul`
  padding: 0.5rem 0.2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 2;
  background-color: ${({ theme }) => theme.body};
  top: 3rem;
  height: ${({ isMenuOpen }) => (isMenuOpen ? "8rem" : 0)};
  opacity: ${({ isMenuOpen }) => (isMenuOpen ? 1 : 0)};
  visibility: ${({ isMenuOpen }) => (isMenuOpen ? "visible" : "hidden")};
  overflow: hidden;
  transition: all 0.5s;
  width: 100%;
`;

S.DropdownMenuItem = styled.li`
  a {
    width: 100%;
    display: block;
    padding: 0.75rem 1rem;
  }
`;

const CheckBoxWrapper = styled.div`
  position: relative;
`;
const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #fafafa;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    background: #bebebe;
    &::after {
      background-color: #363537;
      content: "";
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;

S.Logout = styled.div`
  padding: 0.5rem 1rem;
  cursor: pointer;
  text-align: center;
`;

export default App;
