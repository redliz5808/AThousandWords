import styled from "styled-components";
import { Link } from "react-router-dom";

export const Logo = styled.img`
  max-height: 100px;
`

export const StyledNav = styled.nav`
  display: flex;
  justify-content: space-around;
`
export const StyledUl = styled.ul`
  display: flex;
  width: 100vw;
  margin-right: 20px;
  justify-content: space-between;
  align-items: center;
`

export const StyledLi = styled.li`
  list-style: none;
`

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`