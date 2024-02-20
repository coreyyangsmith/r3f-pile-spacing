// MUI Dependencies
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Components
import './App.css'
import { CssBaseline } from '@mui/material';
import PileSpacing from './pages/PileSpacing/PileSpacing';

// Routing Imports
import { Route, Routes, Link } from "react-router-dom"
import { CustomizationProvider } from './context/Customization';
import { SettingsProvider } from './context/Settings';

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
      'Plus Jakarta Sans',
      'inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
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
      fontFamily: 'Plus Jakarta Sans',
      color: 'black',
      letterSpacing: '3px',
    },
    h1: {
      lineHeight: 1.6,
      fontSize: 64,
      fontWeight: 600,
      fontFamily: 'Plus Jakarta Sans',
      color: 'black',
    },
    h2: {
      lineHeight: 1.6,
      fontSize: 36,
      fontWeight: 600,
      fontFamily: 'Plus Jakarta Sans',
      color: 'black',
    },
    h3: {
      lineHeight: 1.6,
      fontSize: 28,
      fontWeight: 600,
      fontFamily: 'Plus Jakarta Sans',
      color: 'black',
    },
    body1: {
      lineHeight: 1.6,
      fontSize: 18,
      fontWeight: 500,
      fontFamily: 'Plus Jakarta Sans',
      color: 'black',
    },
  },
},
);

function App() {

  return (
    <>
      <CustomizationProvider>
        <SettingsProvider>
          <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <Routes>
              <Route path="/" element={<PileSpacing />} />
            </Routes>
          </ThemeProvider>
        </SettingsProvider>
      </CustomizationProvider>
    </>
  )
}

export default App
