import {createGlobalStyle} from "styled-components";

export const GlobalStyles = createGlobalStyle`

  body {
    background: ${({theme}) => theme.body};
    color: ${({theme}) => theme.text};
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    transition: all 0.25s linear;
  }
  `;
