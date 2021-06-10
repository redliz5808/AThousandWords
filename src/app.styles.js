import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";

export const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

export const Logo = styled.img`
  margin-top: 5px;
  height: 49px;
  width: 49px;
  border-radius: 5px;

  @media (max-width: 768px) {
    margin-left: 20px;
  }
`;

export const StyledNav = styled.nav`
  display: flex;
  justify-content: flex-start;
  text-align: center;
  width: calc(932px - 20px);

  @media (max-width: 780px) {
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    overflow: hidden;
  }
`;

export const StyledUl = styled.ul`
  display: flex;
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

export const StyledLabel = styled.div`
  color: #999999;
`;

export const StyledLi = styled.li`
  list-style: none;
  padding: 0px;
  margin: 0px;
`;

export const NavButtonLi = styled.li`
  list-style: none;
  text-align: center;
  margin: 0px 19px;
  width: 49px;
  color: ${(props) => props.theme.text};
  cursor: pointer;
`;

export const Photos = styled.img``;

export const Saved = styled.img``;

export const StyledLink = styled(NavLink)`
  display: block;
  text-decoration: none;
  color: ${(props) => props.theme.text};
  &.activeLight {
    ${Overlay} {
      &.saved {
        border-radius: 5px;
        background-color: #ffb4bc;
      }
    }
    ${Overlay} {
      &.photos {
        border-radius: 5px;
        background-color: #a2c8fa;
      }
    }
    ${Photos} {
      background-color: #a2c8fa;
    }
    ${Saved} {
      background-color: #ffb4bc;
    }
  }
  &.activeDark {
    ${Overlay} {
      &.saved {
        border-radius: 5px;
        background-color: #ffb4bc;
      }
    }
    ${Overlay} {
      &.photos {
        border-radius: 5px;
        background-color: #a2c8fa;
      }
    }
    ${Photos} {
      background-color: #a2c8fa;
    }
    ${Saved} {
      background-color: #ffb4bc;
    }
  }
`;

export const StyledCamera = styled(FaCamera)``;

export const StyledHeart = styled(AiFillHeart)``;
