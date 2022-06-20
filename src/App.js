// style
import './App.css';
import common from './styles/common.css';
import { defaultTheme } from './styles/theme';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

// pages
import Router from './Router';

function App() {
  const theme = defaultTheme;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  );
}

const GlobalStyle = createGlobalStyle`
${common}; // Reset CSS

body, button, input, textarea {
  color: ${props => props.theme.color.black};
  font-family: ${props => props.theme.fontFamily.default}, sans-serif;
}
a {
  text-decoration: none;
  color: inherit;
}
`;

export default App;
