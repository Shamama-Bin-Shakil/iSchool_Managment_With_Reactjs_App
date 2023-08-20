import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&family=Ubuntu:ital,wght@0,400;0,500;0,700;1,500&display=swap');
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: 'Open Sans', sans-serif;
        
    }body {
        /* overflow-x: hidden; */
    }
`;

export default GlobalStyle;
