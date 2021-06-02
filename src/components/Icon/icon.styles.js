import styled from "styled-components";

export const StyledSpan = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  font-size: 16px;
`;

export const StyledIcon = styled.span`
  font-size: 20px;
  svg path {
    color: ${(props) => props.color};
  }
`;

export const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: ${(props) => (props.type === "star" ? "pointer" : "default")};
`;
