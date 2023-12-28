import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import LoginSite from './component/sites/LoginSite.jsx';
import LogoutSite from './component/sites/LogoutSite.jsx';
import SignUpSite from './component/sites/SignUpSite.jsx';
import HomeSite from './component/sites/HomeSite.jsx';
import EditProfileSite from './component/sites/EditProfileSite.jsx';
import ViewProfileSite from './component/sites/ViewProfileSite.jsx';
import ChatRoomSite from './component/sites/ChatRoomSite.jsx';
import GreetingSite from './component/sites/GreetingSite.jsx';
import SearchSite from './component/sites/SearchSite.jsx';
import ErrorSite from './component/sites/ErrorSite.jsx';

const router = createBrowserRouter([
  {
    index: true,
    element: <LoginSite />,
    errorElement: <ErrorSite />,
  },
  {
    path: '/logout',
    element: <LogoutSite />,
  },
  {
    path: '/signup',
    element: <SignUpSite />,
  },

  {
    path: '/home',
    element: <HomeSite />,
  },
  // OUTLETS
  {
    index: true,
    element: <GreetingSite />,
  },
  {
    path: '/home/:type/:id',
    element: <ChatRoomSite />,
    loader({ params }) {
      return params;
    },
  },
  {
    path: '/home/editprofile',
    element: <EditProfileSite />,
  },
  {
    path: '/home/viewprofile/:id',
    element: <ViewProfileSite />,
    loader({ params }) {
      return params;
    },
  },
  {
    path: '/home/search',
    element: <SearchSite />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
