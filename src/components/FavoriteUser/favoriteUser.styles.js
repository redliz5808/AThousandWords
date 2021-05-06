import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: inline-block;
`;

export const ImageContainer = styled.div`
  margin: 10px;
  padding: 5px;
  border: 1px solid black;
  border-radius: 5px;
`;

export const StyledLink = styled(Link)`
  color: #6958f2;
  text-decoration: none;
`;

export const StyledDiv = styled.div`
  text-align: center;
`;
