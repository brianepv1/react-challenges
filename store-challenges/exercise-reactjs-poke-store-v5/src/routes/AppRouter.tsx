import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import CartPage from '../pages/CartPage';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import styled from 'styled-components';

const Nav = styled.header`
  padding: 1rem 2rem;
  background-color: var(--card-background);
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px var(--shadow-color);
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Logo = styled(Link)`
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--secondary-color);
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: var(--primary-color);
  }
`;

const NavLinksContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

// El prop 'isactive' debe estar en minúsculas para que React no lo pase al DOM
const NavLink = styled(Link)<{ isactive: 'true' | 'false' }>`
  color: ${({ isactive }) => isactive === 'true' ? 'var(--primary-color)' : 'var(--secondary-color)'};
  background-color: ${({ isactive }) => isactive === 'true' ? '#fee' : 'transparent'};
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: var(--secondary-color);
    color: white;
  }
`;

const CartBadge = styled.span`
  background-color: var(--primary-color);
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.75rem;
  margin-left: 8px;
  font-weight: bold;
`;

const MainContent = styled.main`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const AppRouter: React.FC = () => {
  const totalItems = useSelector((state: RootState) => state.cart.totalItems);
  const location = useLocation();

  return (
    <>
      <Nav>
        <Logo to="/">PokéStore</Logo>
        <NavLinksContainer>
          <NavLink to="/" isactive={location.pathname === '/' ? 'true' : 'false'}>
            Inicio
          </NavLink>
          <NavLink to="/cart" isactive={location.pathname === '/cart' ? 'true' : 'false'}>
            Carrito
            {totalItems > 0 && <CartBadge>{totalItems}</CartBadge>}
          </NavLink>
        </NavLinksContainer>
      </Nav>
      <MainContent>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </MainContent>
    </>
  );
};

export default AppRouter;