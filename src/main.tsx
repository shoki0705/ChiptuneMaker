// src/main.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const theme = createTheme({
  palette: { primary: { main: '#4f46e5' }, secondary: { main: '#f59e0b' } }
});

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);
