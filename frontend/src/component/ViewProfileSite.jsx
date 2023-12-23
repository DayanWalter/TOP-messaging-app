import { Link, useLoaderData } from 'react-router-dom';
import styles from './ViewProfileSite.module.css';
import { useEffect, useState } from 'react';
import AddFriendButton from './AddFriendButton';
import Site from './Site';

export default function ViewProfileSite() {
  // Get params for receiver
  const loaderData = useLoaderData();
  const receiverId = loaderData.id;

  const token = localStorage.getItem('jwtoken');
  // Split the payload of the jwt and convert the username-part
  const payload = JSON.parse(atob(token.split('.')[1]));
  // Define the username you are looking for
  const userId = payload._id;

  const [userdata, setUserdata] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  //fetch user_detail
  useEffect(() => {
    const getUserdata = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/user/${receiverId}`,

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
      <Site>
        <div className={styles.site}>
          <div className={styles.content}>
            {loading && <p>Loading...</p>}
            {error && <p>Error {error}</p>}
            {userdata && (
              <>
                <header className={styles.header}>
                  <div className={styles.userIcon}></div>
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
                    <div className={styles.labelContent}>
                      {userdata.username}
                    </div>
                  </div>
                  <div className={styles.button}>
                    {/* If receiverId is not the id of logged in userm display button for adding friend and starting chat */}
                    {receiverId !== userId ? (
                      <>
                        <AddFriendButton friendId={receiverId} />
                        <Link to={`/home/user/${receiverId}`}>
                          <button>Start to chat</button>
                        </Link>
                      </>
                    ) : null}
                  </div>
                </main>
                <footer className={styles.footer}></footer>
              </>
            )}
          </div>
        </div>
      </Site>
    </>
  );
}
