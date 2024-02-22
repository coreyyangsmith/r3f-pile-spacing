/*
Date: 2024-02-21
Author: Corey Yang-Smith
File: App.tsx
Type: Core Component

Description:
This is the main app component that wraps the entire application.
It holds the theme definition as well as routing for the application.
It also wraps the entire application in the context providers.
*/

// MUI Dependencies
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Components
import { CssBaseline } from '@mui/material';
import PileSpacing from './pages/PileSpacing/PileSpacing';

// Routing Imports
import { Route, Routes } from "react-router-dom"
import { CustomizationProvider } from './context/Customization';
import { SettingsProvider } from './context/SettingsContext';
import { PileProvider } from './context/PileContext';
import { HelixProvider } from './context/HelixContext';


// TODO Export THEME to another file...?
// Theme Definition
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#C42929',
    },
    secondary: {
      main: '#40c4ff',
    },
    success: {
      main: '#72EA8C',
    },

  },
  typography: {
    button: {
      textTransform: 'none'
    },
    fontFamily: [
      'inter',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    subtitle1: { // title
      lineHeight: 1.6,
      fontSize: 52,
      fontWeight: 800,
      fontFamily: 'inter',
      color: 'black',
      letterSpacing: '3px',
    },
    h1: {
      lineHeight: 1.6,
      fontSize: 64,
      fontWeight: 600,
      fontFamily: 'inter',
      color: 'white',
    },
    h2: {
      lineHeight: 1.6,
      fontSize: 36,
      fontWeight: 600,
      fontFamily: 'inter',
      color: 'white',
    },
    h3: {
      lineHeight: 1.6,
      fontSize: 28,
      fontWeight: 600,
      fontFamily: 'inter',
      color: 'white',
    },
    body1: {
      lineHeight: 1.6,
      fontSize: 18,
      fontWeight: 500,
      fontFamily: 'inter',
      color: 'white',
    },
  },
},
);

function App() {

  return (
    <>
      <CustomizationProvider>
        <SettingsProvider>
          <PileProvider>
            <HelixProvider>
              <ThemeProvider theme={lightTheme}>
                <CssBaseline />
                <Routes>
                  <Route path="/" element={<PileSpacing />} />
                </Routes>
              </ThemeProvider>
            </HelixProvider>
          </PileProvider>
        </SettingsProvider>
      </CustomizationProvider>
    </>
  )
}

export default App
