import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledParagraph = styled.p`
  text-align: center;
  font-weight: bold;
`;

export const MainContainer = styled.div`
  text-align: center;
  margin-left: 10px;
  width: 937px;
`;

export const SubContainer = styled.div`
  margin: 15px 0px;
  position: relative;
`;

export const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #6958f2;
  text-decoration: none;
  border-radius: 5px;
`;

export const UsernameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
`;

export const Overlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 128px;
  width: 128px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.1);
`;

export const Username = styled.div`
  font-weight: bold;
  background-color: transparent;
  color: #fff;
  text-shadow: 0 0 3px #000;
`;

export const StyledImage = styled.img`
  border-radius: 5px;
`;
