import { Link, useLoaderData } from 'react-router-dom';
import styles from './ViewProfileSite.module.css';
import { useEffect, useState } from 'react';
import Site from './Site';
import Button from '../Button';
import AddFriendForm from '../forms/AddFriendForm';
import UserIcon from '../UserIcon';

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
      {loading && <p>Loading...</p>}
      {error && <p>Error {error}</p>}
      {userdata && (
        <Site>
          <header className={styles.header}>
            <UserIcon />
          </header>

          <main className={styles.main}>
            <div className={styles.labelContainer}>
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
                <div className={styles.labelContent}>{userdata.username}</div>
              </div>
            </div>
          </main>

          <footer className={styles.footer}>
            {receiverId !== userId ? (
              <>
                <AddFriendForm friendId={receiverId} />

                <Link to={`/home/user/${receiverId}`}>
                  <Button text={'Start to chat'} />
                </Link>
              </>
            ) : null}
          </footer>
        </Site>
      )}
    </>
  );
}
