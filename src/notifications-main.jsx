import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, Global, css } from '@emotion/react';
import Notifications from './pages/Notifications';
import { theme } from './theme/tokopediaTheme';
import ErrorBoundary from './components/ErrorBoundary';

const globalStyles = css`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html, body {
    font-family: "Open Sauce One", "Nunito Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background-color: #FFFFFF;
    color: #212121;
    line-height: 1.5;
  }
  a { color: inherit; text-decoration: none; }
`;

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyles} />
        <Notifications />
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
