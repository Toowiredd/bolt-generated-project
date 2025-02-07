import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    Component: lazy(() => import('../layouts/MainLayout')),
    children: [
      { index: true, Component: lazy(() => import('../components/Hero')) },
      { path: 'gallery', Component: lazy(() => import('../components/Gallery')) },
      { path: 'auth', Component: lazy(() => import('../components/Auth')) }
    ]
  }
]);

export default router;
