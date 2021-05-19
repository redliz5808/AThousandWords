import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  border: 5px solid red;
  background-color: ${props => props.theme.body};
  color: ${props => props.theme.text};
`;
