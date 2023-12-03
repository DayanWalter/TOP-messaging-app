import { Link } from 'react-router-dom';
import styles from './EditProfile.module.css';
import { useState } from 'react';

// Offline

export default function EditProfile() {
  const [profile, setProfile] = useState({
    description: 'I love reading books',
    name: 'Jonathan Frakes',
    username: 'JFrakes',
  });

  const handleChange = (key, e) => {
    const newProfile = {
      ...profile,
      [key]: e.currentTarget.value,
    };
    setProfile(newProfile);
  };

  return (
    <>
      <div className={styles.site}>
        <div className={styles.content}>
          <header className={styles.header}>
            <Link to={'/home/viewprofile'}>
              <div className={styles.userIcon}></div>
            </Link>
          </header>
          <main className={styles.main}>
            <div className={styles.label}>
              <div className={styles.labelName}>Description</div>
              <div className={styles.labelContent}>
                <input
                  type="text"
                  name=""
                  id=""
                  value={profile.description}
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
                  name=""
                  id=""
                  value={profile.name}
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
                  name=""
                  id=""
                  value={profile.username}
                  onChange={(e) => {
                    handleChange('username', e);
                  }}
                />
              </div>
            </div>
            <div className={styles.button}>
              <Link to={'/home'}>
                {/* Send changed profile to server */}
                <button>Save changes</button>
              </Link>
            </div>
          </main>
          <footer className={styles.footer}></footer>
        </div>
      </div>
    </>
  );
}
