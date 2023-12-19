import { Link } from 'react-router-dom';
import styles from './Logout.module.css';
import logo from '/logo.svg';
import LoginForm from './LoginForm';
export default function Logout() {
  localStorage.clear();
  return (
    <>
      <main className={styles.main}>
        <div className={styles.companyLogo}>
          <img src={logo} alt="" />
          <h1>Bye, see you soon at Chatty</h1>
        </div>
        <LoginForm />
      </main>
    </>
  );
}
