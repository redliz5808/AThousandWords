import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
`;

export const StyledLink = styled(Link)`
  margin: 20px;
  border: 1px solid black;
  border-radius: 5px;
  display: inline-block;
  color: #6958f2;
  text-decoration: none;
`;

export const Title = styled.h1`
  font-size: 18px;
`;

export const Description = styled.p`
  font-size: 14px;
`;

export const Total = styled.p`
  font-size: 14px;
`;

export const PreviewPhotos = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Preview = styled.img`
  max-width: 100px;
`