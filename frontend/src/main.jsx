import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import UserList from './component/Home/Outlet/UserList.jsx';
import GroupList from './component/Home/Outlet/GroupList.jsx';
import AddFriendButton from './component/Home/Outlet/AddFriendButton.jsx';
import LoginSite from './component/LoginSite.jsx';
import LogoutSite from './component/LogoutSite.jsx';
import SignUpSite from './component/SignUpSite.jsx';
import HomeSite from './component/Home/HomeSite.jsx';
import EditProfileSite from './component/Home/Outlet/EditProfileSite.jsx';
import ViewProfileSite from './component/Home/Outlet/ViewProfileSite.jsx';
import ChatRoomSite from './component/Home/Outlet/ChatRoomSite.jsx';
import GreetingSite from './component/Home/Outlet/GreetingSite.jsx';

const router = createBrowserRouter([
  {
    index: true,
    element: <LoginSite />,
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
    children: [
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
        path: '/home/userlist',
        element: <UserList />,
      },
      {
        path: '/home/grouplist',
        element: <GroupList />,
      },

      {
        path: '/home/user/:id/add',
        element: <AddFriendButton />,
        loader({ params }) {
          return params;
        },
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
