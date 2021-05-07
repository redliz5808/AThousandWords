import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledDiv = styled.div`
  margin-left: 10px;
  @media (max-width: 768px) {
    margin-left: 20px;
  }
`;

export const Logo = styled.img`
  margin-top: 10px;
  max-height: 100px;
`;

export const StyledNav = styled.nav`
  display: flex;
  justify-content: space-around;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: wrap;
    overflow: hidden;
  }
`;
export const StyledUl = styled.ul`
  display: flex;
  width: 100vw;
  margin-right: 20px;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    margin-left: -30px;
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const StyledLi = styled.li`
  list-style: none;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
