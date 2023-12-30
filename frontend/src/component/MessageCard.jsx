import { Link } from 'react-router-dom';
import styles from './MessageCard.module.css';

export default function MessageCard({ text, time, sender }) {
  const convertedTime = new Date(time).toLocaleTimeString();
  console.log(sender);
  return (
    <>
      <Link to={`/home/viewprofile/${sender._id}`}>{sender.name}</Link>
      <div className={styles.container}>
        <div className={styles.left}>
          <p>{text}</p>
        </div>
        <div className={styles.right}>
          <p>{convertedTime}</p>
        </div>
      </div>
    </>
  );
}
