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
import { ThemeProvider } from '@mui/material/styles';

// Components
import PileSpacing from './pages/PileSpacing/PileSpacing';
import Landing from './pages/Landing/Landing';

// Routing Imports
import { Route, Routes } from "react-router-dom"

// Context
import { SettingsProvider } from './context/SettingsContext';
import { PileProvider } from './context/PileContext';
import { HelixProvider } from './context/HelixContext';
import { SelectionProvider } from './context/SelectionContext';

// Theme
import { CssBaseline } from '@mui/material';
import { lightTheme } from './themes/Theme';


function App() {

  return (
    <>
      <SettingsProvider>
        <SelectionProvider>
          <PileProvider>
            <HelixProvider>
              <ThemeProvider theme={lightTheme}>
                <CssBaseline />
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/pile-spacing" element={<PileSpacing />} />
                </Routes>
              </ThemeProvider>
            </HelixProvider>
          </PileProvider>
        </SelectionProvider>
      </SettingsProvider>
    </>
  )
}

export default App
