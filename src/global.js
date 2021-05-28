import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *{
    @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
    font-family: 'Poppins', sans-serif;
    background-color: ${(props) => props.theme.main};
    color: ${(props) => props.theme.text};
  }
`;
