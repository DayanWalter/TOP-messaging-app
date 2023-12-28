import styles from './LogoutSite.module.css';
import logo from '/logo.svg';
import LoginForm from '../forms/LoginForm';
export default function LogoutSite() {
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
