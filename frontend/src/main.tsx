/*
Date: 2024-02-21
Author: Corey Yang-Smith
File: main.tsx
Type: Core Component

Description:
This is the root react component for the entire project.
*/

// Imports
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';

// Components
import React from 'react'
import App from './App.tsx'

// Styling
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
