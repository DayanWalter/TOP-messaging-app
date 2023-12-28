import { useState } from 'react';
import styles from './SearchSite.module.css';
import { Link } from 'react-router-dom';
import ListCard from '../ListCard';
import Site from './Site';
import Button from '../Button';
import Input from '../Input';

export default function SearchSite() {
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

  // Get all friends and display them in the sidebar
  const [group, setGroup] = useState(null);
  const [groupError, setGroupError] = useState(null);
  const [groupLoading, setGroupLoading] = useState(true);

  const getGroups = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/groups?groupname=${encodeURIComponent(
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
  const handleGetData = (e) => {
    getGroups(e);
    getFriends(e);
  };
  return (
    <>
      <Site>
        <div className={styles.site}>
          <div className={styles.content}>
            <>
              <header className={styles.header}></header>
              <main className={styles.main}>
                <form onSubmit={handleGetData}>
                  <Input
                    type={'text'}
                    placeholder={'Enter Username e.g.'}
                    value={searchText}
                    onChange={(e) => {
                      setSearchText(e.target.value);
                    }}
                  />

                  <Button text={'Search'} />
                </form>

                <div className={styles.personContainer}>
                  {userLoading && <p>Enter a username...</p>}
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
                <div className={styles.personContainer}>
                  {groupLoading && (
                    <p>...or a groupname and click &quot;Search&quot;...</p>
                  )}
                  {groupError && <p>Error</p>}
                  {group && (
                    <ul>
                      {/* Map over all groups and display them */}
                      {group.allGroups.map(({ _id, groupname }) => (
                        <li key={_id}>
                          {/* Add ${id} for real groups */}
                          <Link to={`/home/group/${_id}`}>
                            <ListCard name={groupname} />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </main>
              <footer className={styles.footer}></footer>
            </>
          </div>
        </div>
      </Site>
    </>
  );
}
