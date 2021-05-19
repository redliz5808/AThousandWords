import styled from "styled-components";
import { Link } from "react-router-dom";

export const MainContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const SubContainer = styled.div`
  text-align: center;
  width: 932px;
`;

export const StyledImage = styled.img`
  width: 265px;
  height: 265px;
  object-fit: cover;
  margin: 25px 0px;
  border-radius: 5px;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #6958f2;
`;
