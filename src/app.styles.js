import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";

export const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
`;

export const Logo = styled.img`
  margin-left: 3px;
  margin-top: 10px;
  max-height: 100px;

  @media (max-width: 768px) {
    margin-left: 20px;
  }
`;

export const StyledNav = styled.nav`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  width: 932px;

  @media (max-width: 780px) {
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    overflow: hidden;
  }
`;

export const StyledUl = styled.ul`
  display: flex;
  align-items: center;
  padding: 0px;
  margin: 0px;
  width: calc(932px - 709px - 26px);

  @media (max-width: 780px) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
  }
`;

export const Overlay = styled.div`
  width: 49px;
  height: 49px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
`;

export const StyledLi = styled.li`
  list-style: none;
  padding: 0px;
  margin: 0px;
`;

export const NavButtonLi = styled.li`
  list-style: none;
  text-align: center;
  margin: 0px 10px;
  width: 49px;
  color: ${(props) => props.theme.text};
  cursor: pointer;
`;

export const StyledLink = styled(NavLink)`
  display: block;
  text-decoration: none;
  color: ${(props) => props.theme.text};
  &.activeLight {
    ${Overlay} {
      border-radius: 5px;
      background-color: #2b2b2b;
      color: #fff;
      svg {
        background-color: #2b2b2b;
      }
      svg path {
        fill: #fff;
      }
    }
  }
  &.activeDark {
    ${Overlay} {
      border-radius: 5px;
      background-color: #fff;
      color: #2b2b2b;
      svg {
        background-color: #fff;
      }
      svg path {
        fill: #2b2b2b;
      }
    }
  }
`;

export const StyledCamera = styled(FaCamera)``;

export const StyledHeart = styled(AiFillHeart)``;
