import styled from "styled-components";
import { Link } from "react-router-dom";

export const MainContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow-x: hidden;
`;

export const StyledLink = styled(Link)`
  display: inline;
  text-decoration: none;
  color: #6958f2;
`

export const SubContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
`

export const ImageContainer = styled.div`
  text-align: center;
  margin: 5px;
  padding: 7px;
  border: 1px solid black;
  width: 450px;
  border-radius: 5px;
`