import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledParagraph = styled.p`
  text-align: center;
  font-weight: bold;
`;

export const MainContainer = styled.div`
  text-align: center;
  margin-left: 10px;
  width: 932px;
`;

export const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

export const StyledImage = styled.img`
  border-radius: 10px;
  width: 290px;
  height: 290px;
  object-fit: cover;
`;

export const StyledDiv = styled.div`
  height: 290px;
  width: 290px;
  margin: 10px 10px;
  border-radius: 10px;
  background-color: ${(props) => props.backgroundColor || "gray"};
`;
