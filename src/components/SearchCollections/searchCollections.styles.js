import styled from "styled-components";
import { Link } from "react-router-dom";
import { ResponsiveMasonry } from "react-responsive-masonry";

export const Container = styled.div`
  display: inline-block;
  background-color: rgba(0, 0, 0, 0.1);
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
  border-radius: 3px;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #6958f2;
  display: flex;
  align-items: center;
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
