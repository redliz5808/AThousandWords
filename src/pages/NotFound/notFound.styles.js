import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const SubContainer = styled.div`
  width: 932px;
`;

export const StyledLink = styled.a`
  text-decoration: none;
  color: ${(props) => props.theme.color};
  cursor: pointer;
  font-weight: bold;
`;
