import { StyledLink, StyledNav } from './Navbar.styled';

const Navbar = () => {
  return (
    <StyledNav>
      <StyledLink to="/">Довідник</StyledLink>
      <StyledLink to="/papers">Дорожній лист</StyledLink>
    </StyledNav>
  );
};

export default Navbar;
