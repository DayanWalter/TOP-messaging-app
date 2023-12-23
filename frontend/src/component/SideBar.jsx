import { Link } from 'react-router-dom';
import styles from './SideBar.module.css';

import SearchButton from './SearchButton';
import FriendContainer from './FriendContainer';
import GroupContainer from './GroupContainer';

export default function SideBar() {
  const token = localStorage.getItem('jwtoken');
  // Split the payload of the jwt and convert the username-part
  const payload = JSON.parse(atob(token.split('.')[1]));
  // Define the username you are looking for
  const activeUser = payload.username;
  const activeUserId = payload._id;

  return (
    <>
      <div className={styles.sidebar}>
        {/* Change to view own profile */}
        <Link to={`/home/viewprofile/${activeUserId}`}>
          <div className={styles.userIcon}>{activeUser}</div>
        </Link>
        <div className={styles.searchSection}>
          <SearchButton type={'user'} />
        </div>

        <h1>Friends</h1>

        <div className={styles.personContainer}>
          <FriendContainer />
        </div>

        <div className={styles.searchSection}>
          <SearchButton type={'group'} />
        </div>

        <h1>Groups</h1>

        <div className={styles.groupContainer}>
          <GroupContainer />
        </div>

        <div className={styles.editLogoutContainer}>
          <Link to={'/home/editprofile'}>
            <button>Edit Profile</button>
          </Link>

          <Link to={'/logout'}>
            <button>Logout</button>
          </Link>
        </div>
      </div>
    </>
  );
}
