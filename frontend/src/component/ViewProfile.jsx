import { Link } from 'react-router-dom';
import styles from './ViewProfile.module.css';

// Offline
const profile = {
  description: 'I love reading books',
  name: 'Jonathan Frakes',
  username: 'JFrakes',
};
export default function ViewProfile() {
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
              <div className={styles.labelContent}>{profile.description}</div>
            </div>
            <div className={styles.label}>
              <div className={styles.labelName}>Name</div>
              <div className={styles.labelContent}>{profile.name}</div>
            </div>
            <div className={styles.label}>
              <div className={styles.labelName}>Username</div>
              <div className={styles.labelContent}>{profile.username}</div>
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
        </div>
      </div>
    </>
  );
}
