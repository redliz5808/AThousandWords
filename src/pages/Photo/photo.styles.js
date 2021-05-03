import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  text-decoration: none;
  color: #6958f2;
`;

export const TagLink = styled(Link)`
  text-decoration: none;
  color: #6958f2;
  border: 1px solid #6958f2;
  border-radius: 3px;
  padding: 5px;
  margin: 5px;
`

export const UserImage = styled.img`
  max-width: 50px;
  margin-right: 10px;
`;

export const MainImage = styled.img`
  max-width: 40vw;
`;

export const StyledDiv = styled.div`
  margin-top: 10px;
`;

export const Tags = styled.p`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;
