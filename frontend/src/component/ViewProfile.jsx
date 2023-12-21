import { Link, useLoaderData } from 'react-router-dom';
import styles from './ViewProfile.module.css';
import { useEffect, useState } from 'react';

export default function ViewProfile() {
  // Get params for receiver
  const loaderData = useLoaderData();
  const receiverId = loaderData.id;

  const token = localStorage.getItem('jwtoken');
  // Split the payload of the jwt and convert the username-part
  const payload = JSON.parse(atob(token.split('.')[1]));
  // Define the username you are looking for
  const username = payload.username;

  const [userdata, setUserdata] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  //fetch data for user
  useEffect(() => {
    const getUserdata = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/user/${receiverId}`
        );
        if (!response.ok) {
          console.error('Error:', response.statusText);
        }

        const data = await response.json();
        setUserdata(data);
      } catch (error) {
        setError(error.message);
        setUserdata(null);
      } finally {
        setLoading(false);
      }
    };
    getUserdata();
  }, [receiverId]);

  return (
    <>
      <div className={styles.site}>
        <div className={styles.content}>
          {loading && <p>Loading...</p>}
          {error && <p>Error {error}</p>}
          {userdata && (
            <>
              <header className={styles.header}>
                <Link to={'/home/viewprofile'}>
                  <div className={styles.userIcon}></div>
                </Link>
              </header>
              <main className={styles.main}>
                <div className={styles.label}>
                  <div className={styles.labelName}>Description</div>
                  <div className={styles.labelContent}>
                    {userdata.description}
                  </div>
                </div>
                <div className={styles.label}>
                  <div className={styles.labelName}>Name</div>
                  <div className={styles.labelContent}>{userdata.name}</div>
                </div>
                <div className={styles.label}>
                  <div className={styles.labelName}>Username</div>
                  {/* Username */}
                  <div className={styles.labelContent}>{userdata.username}</div>
                </div>
                <div className={styles.button}>
                  <Link to={'/home'}>
                    <button>Add to friends</button>
                  </Link>
                  <Link to={'/home/privatechat'}>
                    <button>Start to chat</button>
                  </Link>
                </div>
              </main>
              <footer className={styles.footer}></footer>
            </>
          )}
        </div>
      </div>
    </>
  );
}
