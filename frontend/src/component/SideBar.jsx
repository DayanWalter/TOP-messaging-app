import { Link } from 'react-router-dom';
import styles from './SideBar.module.css';

import SearchButton from './SearchButton';
import FriendContainer from './FriendContainer';
import GroupContainer from './GroupContainer';
import Button from './Button';
import Input from './Input';
import AddGroupForm from './AddGroupForm';

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
          <Link to={`/home/search`}>
            <Button text={'Search'} />
          </Link>
        </div>

        <h1>Friends</h1>

        <div className={styles.personContainer}>
          <FriendContainer />
        </div>

        <div className={styles.searchSection}></div>
        <AddGroupForm />

        <h1>Groups</h1>

        <div className={styles.groupContainer}>
          <GroupContainer />
        </div>

        <div className={styles.editLogoutContainer}>
          <Link to={'/home/editprofile'}>
            <Button text={'Edit Profile'} />
          </Link>

          <Link to={'/logout'}>
            <Button text={'Logout'} />
          </Link>
        </div>
      </div>
    </>
  );
}
