import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

export const StyledImage = styled.img`
  padding: 5px;
  margin: 10px;
  border: 1px solid black;
`;
