import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const StyledLink = styled(Link)`
  margin: 20px;
  border-radius: 5px;
  display: inline-block;
  color: #6958f2;
  text-decoration: none;
`;

export const StyledImage = styled.img`
  width: 86px;
  height: 86px;
  object-fit: cover;
  border-radius: 5px;
`;

export const Title = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 16px;
`;
