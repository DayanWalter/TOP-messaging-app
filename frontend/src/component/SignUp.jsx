import { Link } from 'react-router-dom';
import styles from './SignUp.module.css';
import logo from '/logo.svg';
export default function SignUp() {
  const handleSubmit = async () => {
    // POST the signup values from input
    try {
      const response = await fetch(`http://localhost:3000/user/`, {
        method: 'POST',
        body: JSON.stringify({
          username: 'username',
          email: 'email',
          password: 'password',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        console.error('Error:', response.statusText);
      }
      const json = await response.json();

      console.log(json);
    } catch (error) {
      console.error('Error', error);
    }
  };

  return (
    <>
      <main className={styles.main}>
        <div className={styles.companyLogo}>
          <img src={logo} alt="" />
          <h1>Chatty</h1>
        </div>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
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
            name="repeatPassword"
            id="repeatPassword"
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
