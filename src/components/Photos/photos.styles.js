import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const StyledImage = styled.img`
  margin: 5px;
`

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #6958f2;
`
