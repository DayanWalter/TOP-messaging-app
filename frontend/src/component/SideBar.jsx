import { Link } from 'react-router-dom';
import styles from './SideBar.module.css';
import Person from './Person';
import Chat from './Chat';
import { useEffect, useState } from 'react';

export default function SideBar() {
  // Get all friends and display them in the sidebar
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const response = await fetch(`http://localhost:3000/user`);
        if (!response.ok) {
          console.error('Error:', response.statusText);
        }

        const users = await response.json();

        setUser(users);
        setError(null);
      } catch (error) {
        setError(error.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    getFriends();
  }, []);

  const friends = [
    {
      _id: 1,
      username: 'Pete',
    },
    {
      _id: 2,
      username: 'Fred',
    },
    {
      _id: 3,
      username: 'Jeff',
    },
    {
      _id: 4,
      username: 'Melissa',
    },
    {
      _id: 5,
      username: 'Tina',
    },
  ];
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

        <h1>Friends</h1>

        <div className={styles.personContainer}>
          {loading && <p>Loading...</p>}
          {error && <p>Error</p>}
          {user && (
            <ul>
              {user.allUser.map(({ _id, username }) => (
                <li key={_id}>
                  {/* Add ${id} for real people */}
                  <Link to={`/home/privatechat`}>
                    <Person name={username} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <h1>Chatroom</h1>

        <div className={styles.chatroomContainer}>
          <ul>
            {chatroom.map(({ id, name }) => (
              <li key={id}>
                {/* Add ${id} for real rooms*/}
                <Link to={`/home/chatroom`}>
                  <Chat name={name} />
                </Link>
              </li>
            ))}
          </ul>
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
