import { Link } from 'react-router-dom';
import styles from './SignUp.module.css';
import logo from '/logo.svg';
import { useState } from 'react';
export default function SignUp() {
  const [user, setUser] = useState();

  const handleSubmit = async () => {
    // POST the signup values from input
    try {
      const response = await fetch(`http://localhost:3000/user/`, {
        method: 'POST',
        body: JSON.stringify({
          username: user.username,
          email: user.email,
          password: user.password,
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

  const handleInputChange = (fieldname) => (e) => {
    const newUser = {
      ...user,
      [fieldname]: e.target.value,
    };
    setUser(newUser);
  };
  const handleAddUsername = handleInputChange('username');
  const handleAddEmail = handleInputChange('email');
  const handleAddPassword = handleInputChange('password');

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
            onChange={handleAddUsername}
          />

          <input
            type="text"
            name="email"
            id="email"
            placeholder="Choose Email"
            onChange={handleAddEmail}
          />

          <input
            type="password"
            name="password"
            id="password"
            placeholder="Choose Password"
            onChange={handleAddPassword}
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
