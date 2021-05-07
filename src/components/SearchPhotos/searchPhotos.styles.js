import styled from "styled-components";
import { Link } from "react-router-dom";
import { ResponsiveMasonry } from "react-responsive-masonry";

export const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

export const StyledImage = styled.img`
  padding: 5px;
  margin: 10px;
  border: 1px solid black;
`;

export const StyledResponsiveMasonry = styled(ResponsiveMasonry)`
  margin-left: 20px;
`;
