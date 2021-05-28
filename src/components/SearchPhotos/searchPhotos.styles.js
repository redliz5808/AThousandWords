import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledParagraph = styled.p`
  text-align: center;
  font-weight: bold;
`;

export const MainContainer = styled.div`
  text-align: center;
`;

export const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

export const StyledImage = styled.img`
  border-radius: 10px;
  width: 265px;
  height: 265px;
  object-fit: cover;
`;

export const StyledDiv = styled.div`
  height: 265px;
  width: 265px;
  margin: 20px 0px;
  border-radius: 10px;
  background-color: ${(props) => props.backgroundColor || "gray"};
`