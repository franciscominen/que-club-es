import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root {
        --dark: #272727;
        --light: #FAFAFA;
        --red: #FF3D3D;
        --green: #1FD26B;
        --principalFont: 'Fugaz One', cursive;
        --alternativeFont: 'Roboto', sans-serif;
    }

   /*  html, */
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        // overflow-x: hidden;
        font-family: var(--principalFont);
        user-select: none;
    }

    body {
        background: var(--dark);
        overflow: hidden;
    }

    button {
        cursor: pointer;
        border: none;
    }

    ul {
        list-style: none;
    }
`;

export default GlobalStyle;
