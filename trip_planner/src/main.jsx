import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from './components/ui/sonner';

import Header from './components/custom/Header';
import ProtectedRoute from './components/ProtectedRoute';
import CreateTrip from './create-trip';
import Viewtrip from './view-trip/[tripId]';
import Mytrips from './my-trip';
import SharedTripView from './shared-trip';
import Help from './help';
import Chat from './chat';
import FAQs from './faqs';

const RootLayout = () => (
  <>
    <Header />
    <Toaster richColors />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <App /> },
      { path: '/share/:shareId', element: <SharedTripView /> },
      { path: '/help', element: <Help /> },
      { path: '/chat', element: <Chat /> },
      { path: '/faqs', element: <FAQs /> },
      { path: '/create-trip', element: <CreateTrip /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/view-trip/:tripId', element: <Viewtrip /> },
          { path: '/my-trips', element: <Mytrips /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </ThemeProvider>
  </StrictMode>
);
