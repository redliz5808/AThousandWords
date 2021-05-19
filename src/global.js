import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *{
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
  }
`;
