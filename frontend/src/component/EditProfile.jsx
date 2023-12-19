import { Link, useLoaderData } from 'react-router-dom';
import styles from './EditProfile.module.css';
import { useEffect, useState } from 'react';

export default function EditProfile() {
  const token = localStorage.getItem('jwtoken');
  // Split the payload of the jwt and convert the username-part
  const payload = JSON.parse(atob(token.split('.')[1]));
  // Define the username you are looking for
  const activeUserId = payload._id;

  const [userdata, setUserdata] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  //fetch data for user
  useEffect(() => {
    const getUserdata = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/user/${activeUserId}`
        );
        if (!response.ok) {
          console.error('Error:', response.statusText);
        }

        const data = await response.json();
        console.log(data);
        setUserdata(data);
      } catch (error) {
        setError(error.message);
        setUserdata(null);
      } finally {
        setLoading(false);
      }
    };
    getUserdata();
  }, [activeUserId]);

  const handleChange = (key, e) => {
    const newProfile = {
      ...userdata,
      [key]: e.currentTarget.value,
    };
    setUserdata(newProfile);
  };

  // PUT user data
  const formSubmit = async (e) => {
    e.preventDefault();
    // PUT
    try {
      const response = await fetch(
        `http://localhost:3000/api/user/editprofile`,
        {
          method: 'PUT',
          // Just the text is send via body
          body: JSON.stringify(userdata),

          headers: {
            // Sender is in the token
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const json = await response.json();
        // console.log(json);
      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  // console.log(userdata);
  return (
    <>
      <div className={styles.site}>
        <div className={styles.content}>
          {loading && <p>Loading...</p>}
          {error && <p>Error</p>}
          {userdata && (
            <>
              <header className={styles.header}>
                <Link to={'/home/viewprofile'}>
                  <div className={styles.userIcon}></div>
                </Link>
              </header>
              <main className={styles.main}>
                <form onSubmit={formSubmit}>
                  <div className={styles.label}>
                    <div className={styles.labelName}>Description</div>
                    <div className={styles.labelContent}>
                      <input
                        type="text"
                        name="description"
                        id="description"
                        defaultValue={userdata.description}
                        onChange={(e) => {
                          handleChange('description', e);
                        }}
                      />
                    </div>
                  </div>
                  <div className={styles.label}>
                    <div className={styles.labelName}>Name</div>
                    <div className={styles.labelContent}>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        defaultValue={userdata.name}
                        onChange={(e) => {
                          handleChange('name', e);
                        }}
                      />
                    </div>
                  </div>
                  <div className={styles.label}>
                    <div className={styles.labelName}>Username</div>
                    <div className={styles.labelContent}>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        defaultValue={userdata.username}
                        onChange={(e) => {
                          handleChange('username', e);
                        }}
                      />
                    </div>
                  </div>
                  <div className={styles.button}>
                    {/* <Link to={'/home'}> */}
                    {/* Send changed profile to server */}
                    <button type="submit">Save changes</button>
                    {/* </Link> */}
                  </div>
                </form>
              </main>
              <footer className={styles.footer}></footer>
            </>
          )}
        </div>
      </div>
    </>
  );
}
