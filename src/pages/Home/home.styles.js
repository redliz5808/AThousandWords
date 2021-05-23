import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledParagraph = styled.p`
  text-align: center;
  font-weight: bold;
`;

export const StyledLink = styled(Link)`
  display: inline;
  text-decoration: none;
  color: #6958f2;
`;

export const MainContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const ChildContainer = styled.div`
  width: 932px;
`;

export const SubContainer = styled.div`
  display: flex;
`;

export const ImageContainer = styled.div`
  text-align: center;
  margin: 5px;
  padding: 7px;
  border-radius: 5px;
  cursor: pointer;
`;

export const StyledImg = styled.img`
  width: 100%;
  height: auto;
  display: block;
  border-radius: 5px;
`;
