import styled from "styled-components";
import { Link } from "react-router-dom";
import { ResponsiveMasonry } from "react-responsive-masonry";

export const ImageContainer = styled.div`
  margin: 10px;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;

export const StyledLink = styled(Link)`
  color: #6958f2;
  text-decoration: none;
  display: flex;
  align-items: center;
`;

export const Title = styled.h3`
  color: #6958f2;
`;

export const CollectionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const PreviewPhotos = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Preview = styled.img`
  max-width: 100px;
  height: 100%;
  border-radius: 3px;
`;

export const Total = styled.p`
  color: black;
`;

export const StyledResponsiveMasonry = styled(ResponsiveMasonry)`
  margin-left: 20px;
`;

export const StyledImage = styled.img`
  border-radius: 5px;
`;

export const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Username = styled.span`
  margin-left: 5px;
`;
