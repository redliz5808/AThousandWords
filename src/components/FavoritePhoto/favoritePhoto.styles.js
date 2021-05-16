import styled from "styled-components";
import { Link } from "react-router-dom";
import { ResponsiveMasonry } from "react-responsive-masonry";

export const Container = styled.div`
  display: inline-block;
`;

export const ImageContainer = styled.div`
  padding: 5px;
`;

export const StyledLink = styled(Link)`
  color: #6958f2;
  text-decoration: none;
`;

export const StyledImage = styled.img`
  border-radius: 5px;
`;

export const StyledResponsiveMasonry = styled(ResponsiveMasonry)`
  margin-left: 20px;
`;