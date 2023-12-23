import { Link } from 'react-router-dom';
import styles from './MessageCard.module.css';

export default function MessageCard({ text, time, sender }) {
  const convertedTime = new Date(time).toLocaleTimeString();
  return (
    <>
      <Link to={`/home/viewprofile/${sender._id}`}>{sender.username}</Link>
      <div className={styles.container}>
        <div className={styles.left}>
          <p>&quot;{text}&quot;</p>
        </div>
        <div className={styles.right}>
          <p>{convertedTime}</p>
        </div>
      </div>
    </>
  );
}
