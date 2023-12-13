import { Link } from 'react-router-dom';
import styles from './Message.module.css';

export default function Message({ from, message, time }) {
  return (
    <>
      <p>
        {/* Add ${id} for real people */}
        <Link to={`/home/viewprofile`}>{from}</Link>:
      </p>
      <div className={styles.container}>
        <div className={styles.left}>
          <p>&quot;{message}&quot;</p>
        </div>
        <div className={styles.right}>
          <p>{time}</p>
        </div>
      </div>
    </>
  );
}
