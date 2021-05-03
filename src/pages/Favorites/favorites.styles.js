import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const ImageContainer = styled.div`
  margin: 10px;
  padding: 5px;
  border: 1px solid black;
  border-radius: 5px;
`;

export const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`;
