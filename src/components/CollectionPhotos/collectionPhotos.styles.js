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
  padding: 5px;
  border: 1px solid black;
  border-radius: 5px;
  display: inline-block;
  color: #6958f2;
  text-decoration: none;
`;

export const StyledDiv = styled.div`
  margin-top: 10px;
`;
