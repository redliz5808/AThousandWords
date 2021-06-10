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
  width: 932px;
`;

export const StyledLink = styled(Link)`
  border-radius: 5px;
  text-decoration: none;
`;

export const StyledDiv = styled.div`
  background-color: ${(props) => props.backgroundColor || "gray"};
  height: 290px;
  width: 290px;
  border-radius: 5px;
  margin: 10px 0px;
`;

export const StyledImage = styled.img`
  border-radius: 5px;
  width: 290px;
  height: 290px;
  object-fit: cover;
`;
