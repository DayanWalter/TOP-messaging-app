import { Link } from 'react-router-dom';
import styles from './ErrorSite.module.css';

export default function ErrorSite() {
  return (
    <div className={styles.site}>
      <div className={styles.content}>
        <h1>Oh no, this route doesn&apos;t exist!</h1>
        <li>
          <Link to="/">
            Go back to the login page by clicking here, though!
          </Link>
        </li>
      </div>
    </div>
  );
}
