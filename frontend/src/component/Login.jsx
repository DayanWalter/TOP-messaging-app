import { Link } from 'react-router-dom';
import styles from './Login.module.css';
import logo from '/logo.svg';
export default function Login() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.companyLogo}>
          <img src={logo} alt="" />
          <h1>Chatty</h1>
        </div>
        <form className={styles.loginForm}>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          <button type="submit">Login</button>
          <Link to={'/signup'}>Sign Up</Link>
        </form>
        {/* <p>Login</p>
        <Link to={'/home'}>Home</Link> */}
      </main>
    </>
  );
}
