import { createGlobalStyle } from 'styled-components';
import modernNormalize from 'modern-normalize';
const GlobalStyles = createGlobalStyle`
  ${modernNormalize}

  :root {
    --nav-btn: #F1F1F1;
    --btn-active: #47523F;
    --white: #FBFCFC;
    --dark: #202020;
    --text-dark: #191413;
    --gray: #8A8A89;
    --transparent-gray: #1914134D;
    --modal-btn-add: #47523F;
    --modal-btn-add-active: #30392A;
    --modal-btn-remove: #282828;

    /* animation */
    --fast: 0.15s ease;
  }

  body {
    margin: 0;
    font-family: 'Manrope', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 1.43;
    color: var(--text-dark);
    background: #F0F0F0;

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      -webkit-background-clip: text;
      -webkit-text-fill-color: var(--white);
      background-color: #282828;
      box-shadow: inset 0 0 20px 20px #282828;
      transition: all 0s 50000s;
      transition: background-color 5000s ease-in-out 0s;
    }

    input[type=number] {
      -moz-appearance: textfield;
    }

    input[type=time]::-webkit-calendar-picker-indicator {
      cursor: pointer;
      color: white;
      height: 100%;
      filter: invert(1);
      background-size: 20px 20px;
      background-position: center;
      padding: 10px;
  }
  input[type="time"]::-webkit-calendar-picker-indicator::after {
      content: 'boom';
      color: #333;
      font-size: 14px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

  ::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #F0F0F0;
}
  }

  p,
  h1,
  h2,
  h3 {
    margin: 0;
    padding: 0;
  }

  ul,
  ol,
  li {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
  }
  p.italic {
  // font-size: large;
    display: flex;
    justify-content: space-around;
    font-weight: 100;
    font-style: italic;
  }
`;

export default GlobalStyles;
