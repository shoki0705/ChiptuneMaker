// src/main.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

// トレンド感のあるパステル＆アクセント
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#5A67D8',       // Indigo 600
      light: '#7F9CF5',      // Indigo 400
      dark: '#434190',       // Indigo 700
    },
    secondary: {
      main: '#F6AD55',       // Orange 400
      light: '#FBD38D',      // Orange 300
      dark: '#DD6B20',       // Orange 500
    },
    success: {
      main: '#48BB78',       // Green 400
    },
    info: {
      main: '#4FD1C5',       // Teal 400
    },
    error: {
      main: '#E53E3E',       // Red 600
    },
    background: {
      default: '#F7FAFC',    // Gray 50
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2D3748',    // Gray 800
      secondary: '#4A5568',  // Gray 600
    },
  },
  typography: {
    fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      color: '#2D3748',
    },
    subtitle2: {
      color: '#4A5568',
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);
