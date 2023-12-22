import { Link } from 'react-router-dom';
import styles from './SideBar.module.css';
import { useEffect, useState } from 'react';
import ListCard from './ListCard';
import Search from './Search';

export default function SideBar() {
  const token = localStorage.getItem('jwtoken');
  // Split the payload of the jwt and convert the username-part
  const payload = JSON.parse(atob(token.split('.')[1]));
  // Define the username you are looking for
  const activeUser = payload.username;
  const activeUserId = payload._id;

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
        const response = await fetch(`http://localhost:3000/api/friends`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
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
        const response = await fetch(
          `http://localhost:3000/api/groups`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
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
  return (
    <>
      <div className={styles.sidebar}>
        {/* Change to view own profile */}
        <Link to={`/home/viewprofile/${activeUserId}`}>
          <div className={styles.userIcon}>{activeUser}</div>
        </Link>
        <div className={styles.searchSection}>
          <Search type={'user'} />
        </div>

        <h1>Friends</h1>

        <div className={styles.personContainer}>
          {userLoading && <p>Loading...</p>}
          {userError && <p>Error</p>}
          {user && (
            <ul>
              {/* Map over all user an display them */}
              {user.friends.map(({ _id, username }) =>
                // Display alle users, except logged in user
                activeUser !== username ? (
                  <li key={_id}>
                    {/* Add ${id} for real people */}
                    <Link to={`/home/user/${_id}`}>
                      <ListCard name={username} />
                    </Link>
                  </li>
                ) : null
              )}
            </ul>
          )}
        </div>

        <div className={styles.searchSection}>
          <Search type={'group'} />
        </div>

        <h1>Groups</h1>

        <div className={styles.groupContainer}>
          {groupLoading && <p>Loading...</p>}
          {groupError && <p>Error</p>}
          {group && (
            <ul>
              {group.allGroups.map(({ _id, name }) => (
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
