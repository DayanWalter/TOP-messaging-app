import { Link, useNavigate } from 'react-router-dom';
import styles from './EditProfileSite.module.css';
import { useEffect, useState } from 'react';
import Site from './Site';

export default function EditProfileSite() {
  const token = localStorage.getItem('jwtoken');
  // Split the payload of the jwt and convert the username-part
  const payload = JSON.parse(atob(token.split('.')[1]));
  // Define the username you are looking for
  const activeUserId = payload._id;

  const [userdata, setUserdata] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  //fetch data for user
  useEffect(() => {
    const getUserdata = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/user/${activeUserId}`,
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
  }, [activeUserId]);

  const handleChange = (key, e) => {
    const newUserdata = {
      ...userdata,
      [key]: e.currentTarget.value,
    };
    setUserdata(newUserdata);
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
        navigate('/home');
      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <>
      <Site>
        <div className={styles.site}>
          <div className={styles.content}>
            {loading && <p>Loading...</p>}
            {error && <p>Error:{error}</p>}
            {userdata && (
              <>
                <header className={styles.header}>
                  <Link to={`/home/viewprofile/${activeUserId}`}>
                    <div className={styles.userIcon}>{userdata.username}</div>
                  </Link>
                </header>
                <form className={styles.form} onSubmit={formSubmit}>
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
              </>
            )}
          </div>
        </div>
      </Site>
    </>
  );
}
