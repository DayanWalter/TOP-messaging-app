import { useEffect, useState } from 'react';
import styles from './ViewProfile.module.css';
import { Link, useLocation } from 'react-router-dom';
import ListCard from './ListCard';

export default function UserList() {
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

  const [searchText, setSearchText] = useState('');

  const getFriends = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/users?username=${encodeURIComponent(
          searchText
        )}`,
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
  return (
    <>
      <div className={styles.site}>
        <div className={styles.content}>
          {/* {loading && <p>Loading...</p>}
          {error && <p>Error</p>}
          {userdata && ( */}
          <>
            <header className={styles.header}></header>
            <main className={styles.main}>
              <form onSubmit={getFriends}>
                <input
                  type="text"
                  placeholder="Enter Username"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <button type="submit">Search</button>
              </form>
              <div className={styles.personContainer}>
                {userLoading && (
                  <p>Enter a name and click &quot;Search&quot;...</p>
                )}
                {userError && <p>Error</p>}
                {user && (
                  <ul>
                    {/* Map over all user an display them */}
                    {user.allUser.map(({ _id, username }) =>
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
            </main>
            <footer className={styles.footer}></footer>
          </>
        </div>
      </div>
    </>
  );
}
