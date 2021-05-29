import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledParagraph = styled.p`
  text-align: center;
  font-weight: bold;
`;

export const StyledLink = styled(Link)`
  border-radius: 5px;
  text-decoration: none;
`;

export const StyledDiv = styled.div`
  background-color: ${(props) => props.backgroundColor || "gray"};
  height: 223px;
  width: 223px;
  border-radius: 5px;
  margin: 17px 0px;
`;

export const StyledImage = styled.img`
  border-radius: 5px;
  width: 223px;
  height: 223px;
  object-fit: cover;
`;
