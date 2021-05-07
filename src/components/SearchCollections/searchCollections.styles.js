import styled from "styled-components";
import { Link } from "react-router-dom";
import { ResponsiveMasonry } from "react-responsive-masonry";

export const Container = styled.div`
  display: inline-block;
  border: 1px solid black;
  border-radius: 5px;
  margin: 20px;
`;

export const Title = styled.span`
  font-weight: bold;
  font-size: 18px;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

export const CollectionLink = styled(Link)`
  text-decoration: none;
  color: #6958f2;
`;

export const PreviewPhotos = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Preview = styled.img`
  max-width: 100px;
  height: 100%;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #6958f2;
`;

export const Total = styled.p`
  color: black;
`;

export const StyledResponsiveMasonry = styled(ResponsiveMasonry)`
  margin-left: 20px;
`;
