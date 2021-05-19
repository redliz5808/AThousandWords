import styled from "styled-components";
import { Link } from "react-router-dom";

export const MainContainer = styled.div`
  text-align: center;
`

export const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

export const StyledImage = styled.img`
  border-radius: 10px;
  width: 223px;
  height: 223px;
  object-fit: cover;
  margin: 17px 0px;
`;
