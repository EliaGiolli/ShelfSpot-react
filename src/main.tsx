import React from 'react'
import ReactDOM from 'react-dom/client'
const rootElement = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(rootElement)

import { RouterProvider } from 'react-router-dom'
import { router } from './router/router'


root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
)
