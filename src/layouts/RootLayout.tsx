import React from 'react';
import {Outlet, NavLink} from 'react-router-dom';
import styled from 'styled-components';

const LayoutContainer = styled.div`
    min-height: 100vh;
    background: #f5f5f5;
`;

const NavBar = styled.nav`
    display: flex;
    gap: 1rem;
    justify-content: center;
    padding: 1rem 2rem;
    background: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    border-bottom: 1px solid #eee;
`;

const StyledNavLink = styled(NavLink)`
    padding: 0.5rem 1.5rem;
    color: #666;
    text-decoration: none;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-weight: 500;
    border-radius: 12px;
    transition: all 0.2s ease;
    font-size: 1.2rem;

    &:hover {
        background: #f0f0f0;
        color: #3b82f6;
    }

    &.active {
        background: #3b82f6;
        color: white;
    }
`;

const RootLayout = () => {
  return (
    <LayoutContainer>
      <NavBar>
        <StyledNavLink to="/">Шифр Виженера</StyledNavLink>
        <StyledNavLink to="/cryptanalysis">Криптоанализ</StyledNavLink>
      </NavBar>
      <Outlet/>
    </LayoutContainer>
  );
};

export default RootLayout;