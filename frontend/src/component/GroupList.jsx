import { useEffect, useState } from 'react';
import styles from './GroupList.module.css';
import { Link, useLocation } from 'react-router-dom';
import ListCard from './ListCard';
import Site from './Site';

export default function GroupList() {
  const token = localStorage.getItem('jwtoken');
  // Split the payload of the jwt and convert the username-part
  const payload = JSON.parse(atob(token.split('.')[1]));
  // Define the username you are looking for
  const activeUser = payload.username;
  const activeUserId = payload._id;

  // Get all friends and display them in the sidebar
  const [group, setGroup] = useState(null);
  const [groupError, setGroupError] = useState(null);
  const [groupLoading, setGroupLoading] = useState(true);

  const [searchText, setSearchText] = useState('');

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
  return (
    <>
      <Site>
        <div className={styles.site}>
          <div className={styles.content}>
            <>
              <header className={styles.header}></header>
              <main className={styles.main}>
                <form onSubmit={getGroups}>
                  <input
                    type="text"
                    placeholder="Enter Groupname"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  <button type="submit">Search</button>
                </form>
                <div className={styles.personContainer}>
                  {groupLoading && (
                    <p>Enter a name and click &quot;Search&quot;...</p>
                  )}
                  {groupError && <p>Error</p>}
                  {group && (
                    <ul>
                      {/* Map over all groups and display them */}
                      {group.allGroups.map(({ _id, name }) => (
                        <li key={_id}>
                          {/* Add ${id} for real groups */}
                          <Link to={`/home/group/${_id}`}>
                            <ListCard name={name} />
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