import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledParagraph = styled.p`
  text-align: center;
  font-weight: bold;
`;

export const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 10px;
`;

export const SubContainer = styled.div`
  width: 940px;
`;

export const StyledImage = styled.img`
  width: 290px;
  height: 290px;
  object-fit: cover;
  margin: 10px 0px;
  border-radius: 5px;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #6958f2;
`;
