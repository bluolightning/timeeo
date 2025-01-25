import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Page from './sidebar';
import Dashboard from './Dashboard';
import '@/output.css';

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <Page />,
        },
        {
            path: '/dashboard',
            element: <Dashboard />,
        },
        {
            path: '/mainPage.html',
            element: <Page />,
        },
    ],
    {
        basename: '/',
    }
);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
