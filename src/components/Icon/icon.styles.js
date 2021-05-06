import styled from "styled-components";

export const StyledSpan = styled.span`
  margin-right: 10px;
  color: black;
  font-size: 20px;
`;

export const StyledIcon = styled.span`
  margin-right: 4px;
  font-size: 20px;
`;

export const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  color: ${(props) => props.color || "black"};
  cursor: pointer;
`;
