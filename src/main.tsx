import React from 'react'
import ReactDOM from 'react-dom/client'
const rootElement = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(rootElement)

import './index.css'

import App from './App'

root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
)
