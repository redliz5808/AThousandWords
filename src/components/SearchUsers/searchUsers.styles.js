import styled from "styled-components";
import { Link } from "react-router-dom";
import { ResponsiveMasonry } from "react-responsive-masonry";

export const StyledResponsiveMasonry = styled(ResponsiveMasonry)`
  margin-left: 20px;
`;

export const StyledLink = styled(Link)`
  display: inline-block;
  text-align: center;
  margin: 10px;
  width: 300px;
  color: black;
  text-decoration: none;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;

export const Bio = styled.p`
  max-width: 300px;
`;
