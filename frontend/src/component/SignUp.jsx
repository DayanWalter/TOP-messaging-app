import { Link } from 'react-router-dom';
import styles from './SignUp.module.css';
import logo from '/logo.svg';
export default function SignUp() {
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
            placeholder="Choose Username"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Choose Password"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Repeat Password"
          />
          <button type="submit">Sign Up</button>
          <Link to={'/'}>Login</Link>
        </form>
        {/* <p>Login</p>
        <Link to={'/home'}>Home</Link> */}
      </main>
    </>
  );
}
