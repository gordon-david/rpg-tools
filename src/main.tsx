import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './global.css'
import { About } from './pages/About'
import { Home } from './pages/Home'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={
            createBrowserRouter([
                { path: "/", element: <Home /> },
                { path: '/about', element: <About /> }
            ])
        } />
    </React.StrictMode>,
)
