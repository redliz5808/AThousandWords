import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  display: inline;
  text-decoration: none;
  color: #6958f2;
`


export const TagLink = styled(Link)`
  text-decoration: none;
  color: #6958f2;
  border: 1px solid #6958f2;
  border-radius: 3px;
  padding: 5px;
  margin: 5px;
`

export const Tags = styled.p`
  margin-top: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
`;