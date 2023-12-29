import { Link } from 'react-router-dom';
import styles from './UserIcon.module.css';

export default function UserIcon() {
  const token = localStorage.getItem('jwtoken');
  // Split the payload of the jwt and convert the username-part
  const payload = JSON.parse(atob(token.split('.')[1]));
  // Define the username you are looking for
  const activeUserId = payload._id;
  const activeUserName = payload.name;

  return (
    <Link to={`/home/viewprofile/${activeUserId}`}>
      <div className={styles.userIcon}>{activeUserName}</div>
    </Link>
  );
}
