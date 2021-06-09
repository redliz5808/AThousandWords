import styled from "styled-components";

export const StyledSpan = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  font-size: 18px;
`;

export const StyledIcon = styled.span`
  font-size: 30px;
  svg path {
    color: ${(props) => (props.type === "star" ? "#F6CF58" : props.color)};
  }
`;

export const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: ${(props) => (props.type === "star" ? "pointer" : "default")};
`;
