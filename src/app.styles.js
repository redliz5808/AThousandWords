import styled from "styled-components";
import { Link } from "react-router-dom";

export const Logo = styled.img`
  max-height: 100px;
`

export const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
`
export const StyledUl = styled.ul`
  display: flex;
  min-width: 1000px;
  justify-content: space-around;
  align-items: center;
`

export const StyledLi = styled.li`
  list-style: none;
`

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`