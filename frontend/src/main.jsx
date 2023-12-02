import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Login from './component/Login.jsx';
import Home from './component/Home.jsx';
import ChatRoom from './component/ChatRoom.jsx';
import EditProfile from './component/EditProfile.jsx';
import PrivateChat from './component/PrivateChat.jsx';
import ViewProfile from './component/ViewProfile.jsx';
import Logout from './component/Logout.jsx';
import SignUp from './component/SignUp.jsx';

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
            path: '/home/chatroom',
            element: <ChatRoom />,
          },
          {
            path: '/home/editprofile',
            element: <EditProfile />,
          },
          {
            path: '/home/privatechat',
            element: <PrivateChat />,
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
