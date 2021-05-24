import styled from "styled-components";
import { Link } from "react-router-dom";
import { ResponsiveMasonry } from "react-responsive-masonry";

export const Container = styled.div`
  display: inline-block;
`;

export const ImageContainer = styled.div`
  margin: 10px;
  padding: 5px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.1);
`;

export const StyledLink = styled(Link)`
  color: #6958f2;
  text-decoration: none;
`;

export const StyledImage = styled.img`
  border-radius: 5px;
`;

export const StyledDiv = styled.div`
  text-align: center;
`;

export const StyledResponsiveMasonry = styled(ResponsiveMasonry)`
  margin-left: 20px;
`;
