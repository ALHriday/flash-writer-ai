import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter } from "react-router";
import AuthProvider from './Routers/AuthProvider.jsx'
import Routers from './Routers/Routers.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routers></Routers>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
