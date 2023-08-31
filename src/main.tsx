import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './providers/ThemeProvider.tsx'
import WeatherProvider from './providers/WeatherProvider.tsx'
import { Toaster } from './components/ui/toaster.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <WeatherProvider>
        <App />
        <Toaster />
      </WeatherProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
