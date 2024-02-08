import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const StyledNav = styled.nav`
  display: flex;
  gap: 8px;
`;

export const StyledLink = styled(NavLink)`
  color: var(--transparent-gray);
  background-color: var(--nav-btn);
  text-decoration: none;
  border-radius: 12px;
  padding: 14px 51px;
  transition: var(--fast);

  &.active {
    color: var(--white);
    background-color: var(--btn-active);
  }
  &:hover:not(.active) {
    color: var(--white);
    background-color: var(--modal-btn-add-active);
  }
`;
