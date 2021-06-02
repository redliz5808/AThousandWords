import styled from "styled-components";
import { Link } from "react-router-dom";

export const MainContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const ChildContainer = styled.div`
  width: 932px;
`;

export const Container = styled.div`
  display: flex;
`;

export const ImageContainer = styled.div`
  text-align: center;
  border-radius: 5px;
  margin: 10px 10px;
  cursor: pointer;
  background-color: ${(props) => props.backgroundColor || "gray"};
`;

export const StyledLink = styled(Link)`
  color: #6958f2;
  text-decoration: none;
`;

export const StyledImage = styled.img`
  width: 290px;
  height: 290px;
  object-fit: cover;
  display: block;
  border-radius: 5px;
`;
