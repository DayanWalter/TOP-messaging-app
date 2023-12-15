import { Link, useNavigate } from 'react-router-dom';
import styles from './SignUp.module.css';
import logo from '/logo.svg';
import { useState } from 'react';
export default function SignUp() {
  const navigate = useNavigate();

  const [formdata, setFormdata] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // POST the signup values from input
    try {
      const response = await fetch(`http://localhost:3000/api/user/create`, {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error('Error:', response.statusText);
      }
      // else: successfull signup
      const json = await response.json();
      console.log(json);
      // Navigate after successful SignUp to login page
      navigate('/');
    } catch (error) {
      console.error('Error', error);
    }
  };

  const handleInputChange = (e) => {
    // Destructure e.target.value and fieldname
    const { name, value } = e.target;
    // Create new object
    const newFormdata = {
      ...formdata,
      [name]: value,
    };
    // set Formdata to new object
    setFormdata(newFormdata);
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
            value={formdata.username}
            onChange={handleInputChange}
          />

          <input
            type="text"
            name="email"
            id="email"
            placeholder="Choose Email"
            value={formdata.email}
            onChange={handleInputChange}
          />

          <input
            type="password"
            name="password"
            id="password"
            placeholder="Choose Password"
            value={formdata.password}
            onChange={handleInputChange}
          />
          {/* TODO: Compare the entered passwords */}
          <input
            type="password"
            name="repeatPassword"
            id="repeatPassword"
            placeholder="Repeat Password"
          />
          <button type="submit">Sign Up</button>
          <Link to={'/'}>Login</Link>
        </form>
      </main>
    </>
  );
}
