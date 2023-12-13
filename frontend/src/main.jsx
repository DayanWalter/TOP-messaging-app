import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Login from './component/Login.jsx';
import Home from './component/Home.jsx';
import EditProfile from './component/EditProfile.jsx';
import PrivateChat from './component/PrivateChat.jsx';
import ViewProfile from './component/ViewProfile.jsx';
import Logout from './component/Logout.jsx';
import SignUp from './component/SignUp.jsx';
import Group from './component/Group.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: '/logout',
        element: <Logout />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },

      {
        path: '/home',
        element: <Home />,
        children: [
          {
            index: true,
            element: <Group />,
          },
          {
            path: '/home/group',
            element: <Group />,
          },
          {
            path: '/home/editprofile',
            element: <EditProfile />,
          },
          {
            path: '/home/privatechat/:id',
            element: <PrivateChat />,
            loader({ params }) {
              return params;
            },
          },
          {
            path: '/home/viewprofile',
            element: <ViewProfile />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
