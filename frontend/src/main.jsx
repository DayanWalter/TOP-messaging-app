import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import UserList from './component/UserList.jsx';
import GroupList from './component/GroupList.jsx';
import AddFriendButton from './component/AddFriendButton.jsx';
import LoginSite from './component/LoginSite.jsx';
import LogoutSite from './component/LogoutSite.jsx';
import SignUpSite from './component/SignUpSite.jsx';
import HomeSite from './component/HomeSite.jsx';
import EditProfileSite from './component/EditProfileSite.jsx';
import ViewProfileSite from './component/ViewProfileSite.jsx';
import ChatRoomSite from './component/ChatRoomSite.jsx';
import GreetingSite from './component/GreetingSite.jsx';
import SearchSite from './component/SearchSite.jsx';

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

  {
    path: '/home/userlist',
    element: <UserList />,
  },
  {
    path: '/home/grouplist',
    element: <GroupList />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
