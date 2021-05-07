import styled from "styled-components";
import { Link } from "react-router-dom";
import { ResponsiveMasonry } from "react-responsive-masonry";

export const StyledLink = styled(Link)`
  display: inline;
  text-decoration: none;
  color: #6958f2;
`;

export const SubContainer = styled.div`
  display: flex;
`;

export const ImageContainer = styled.div`
  text-align: center;
  margin: 5px;
  padding: 7px;
  border: 1px solid black;
  border-radius: 5px;
`;

export const StyledResponsiveMasonry = styled(ResponsiveMasonry)`
  margin-left: 20px;
`;

export const StyledH2 = styled.h2`
  margin-left: 20px;
`