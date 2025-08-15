import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #EF5350; /* Un rojo Pokémon */
    --secondary-color: #3866B0; /* Un azul Pokémon */
    --background-color: #f7f7f7;
    --text-color: #333;
    --card-background: #ffffff;
    --shadow-color: rgba(0, 0, 0, 0.1);
  }

  /* Opcional: Añadir la fuente en tu public/index.html */
  /* <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet"> */

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Roboto', sans-serif;
    background-color: var(--background-color);
    color: var(--text-color);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
  }
`;