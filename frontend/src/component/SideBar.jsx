import { Link } from 'react-router-dom';
import styles from './SideBar.module.css';

export default function SideBar() {
  return (
    <>
      <div className={styles.sidebar}>
        <div className={styles.userIcon}>
          <Link to={'/home/viewprofile'}>ViewProfile</Link>
        </div>
        <div className={styles.searchSection}>
          <input type="text" placeholder="Search User" />
          <button>Search</button>
        </div>

        <h1>People</h1>

        <div className={styles.personContainer}>
          <div className={styles.person}>User1</div>
          <div className={styles.person}>User2</div>
          <div className={styles.person}>User2</div>
          <div className={styles.person}>User2</div>
          <div className={styles.person}>User2</div>
          <div className={styles.person}>User2</div>
          <div className={styles.person}>User2</div>
          <Link to={'/home/privatechat'}>PrivateChat</Link>
        </div>

        <h1>Chatroom</h1>

        <div className={styles.chatroomContainer}>
          <div className={styles.chatroom}>Chat1</div>
          <div className={styles.chatroom}>Chat2</div>
          <div className={styles.chatroom}>Chat2</div>
          <div className={styles.chatroom}>Chat2</div>
          <div className={styles.chatroom}>Chat2</div>
          <div className={styles.chatroom}>Chat2</div>
          <div className={styles.chatroom}>Chat2</div>
          <Link to={'/home/chatroom'}>ChatRoom</Link>
        </div>

        <div className={styles.editLogoutContainer}>
          <button>
            Edit Profile
            <Link to={'/home/editprofile'}>EditProfile</Link>
          </button>

          <button>
            Logout
            <Link to={'/logout'}>Logout</Link>
          </button>
        </div>

        {/* <Link to={'/home'}>Home</Link> */}
      </div>
    </>
  );
}
