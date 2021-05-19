import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
`;

export const Logo = styled.img`
  margin-left: 10px;
  margin-top: 10px;
  max-height: 100px;
  @media (max-width: 768px) {
    margin-left: 20px;
  }
`;

export const StyledNav = styled.nav`
  display: flex;
  width: 932px;

  @media (max-width: 780px) {
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: wrap;
    overflow: hidden;
  }
`;

export const StyledUl = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-right: 20px;
  width: 100%;

  @media (max-width: 780px) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
  }
`;

export const StyledLi = styled.li`
  list-style: none;
  flex-grow: 10;
`;

export const NavButtonLi = styled.li`
  list-style: none;
  text-align: center;
  flex-grow: 1;
  color: #6958f2;
  cursor: pointer;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #6958f2;
`;
