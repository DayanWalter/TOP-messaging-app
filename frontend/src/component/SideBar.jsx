import { Link } from 'react-router-dom';
import styles from './SideBar.module.css';
import { useEffect, useState } from 'react';
import ListCard from './ListCard';

export default function SideBar() {
  // Get all friends and display them in the sidebar
  const [user, setUser] = useState(null);
  const [userError, setUserError] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  // Get all groups and display them in the sidebar
  const [group, setGroup] = useState(null);
  const [groupError, setGroupError] = useState(null);
  const [groupLoading, setGroupLoading] = useState(true);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const response = await fetch(`http://localhost:3000/user`);
        if (!response.ok) {
          console.error('Error:', response.statusText);
        }

        const users = await response.json();

        setUser(users);
        setUserError(null);
      } catch (error) {
        setUserError(error.message);
        setUser(null);
      } finally {
        setUserLoading(false);
      }
    };
    getFriends();
  }, []);

  useEffect(() => {
    const getGroups = async () => {
      try {
        const response = await fetch(`http://localhost:3000/chat`);
        if (!response.ok) {
          console.error('Error:', response.statusText);
        }

        const groups = await response.json();

        setGroup(groups);
        setGroupError(null);
      } catch (error) {
        setGroupError(error.message);
        setGroup(null);
      } finally {
        setGroupLoading(false);
      }
    };
    getGroups();
  }, []);

  const chatroom = [
    {
      id: 1,
      name: 'Global',
    },
    {
      id: 2,
      name: 'Regional',
    },
    {
      id: 3,
      name: 'Nordlichter',
    },
    {
      id: 4,
      name: 'Lowcarb',
    },
  ];
  return (
    <>
      <div className={styles.sidebar}>
        <Link to={'/home/viewprofile'}>
          <div className={styles.userIcon}></div>
        </Link>
        <div className={styles.searchSection}>
          <input type="text" placeholder="Search User" />
          <button>Search</button>
        </div>

        <h1>User</h1>

        <div className={styles.personContainer}>
          {userLoading && <p>Loading...</p>}
          {userError && <p>Error</p>}
          {user && (
            <ul>
              {/* Map over all user an display them */}
              {user.allUser.map(({ _id, username }) => (
                <li key={_id}>
                  {/* Add ${id} for real people */}
                  <Link to={`/home/privatechat/${_id}`}>
                    <ListCard name={username} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <h1>Group</h1>

        <div className={styles.groupContainer}>
          {groupLoading && <p>Loading...</p>}
          {groupError && <p>Error</p>}
          {group && (
            <ul>
              {group.allChats.map(({ _id, name }) => (
                <li key={_id}>
                  {/* Add ${id} for real rooms*/}
                  <Link to={`/home/group/${_id}`}>
                    <ListCard name={name} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.editLogoutContainer}>
          <Link to={'/home/editprofile'}>
            <button>Edit Profile</button>
          </Link>

          <Link to={'/logout'}>
            <button>Logout</button>
          </Link>
        </div>
      </div>
    </>
  );
}
