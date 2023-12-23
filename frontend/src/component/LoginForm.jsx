import { Link, useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.css';
import logo from '/logo.svg';
import { useState } from 'react';

export default function LoginForm() {
  const navigate = useNavigate();
  // Save input from form
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/user/login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const json = await response.json();
        // save jwt in localstorage
        localStorage.setItem('jwtoken', json.token);
        console.log('Successful login', json);
        navigate('/home');
      } else {
        console.error('Failed to login');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
        <Link to={'/signup'}>Sign Up</Link>
        <Link to={'/home'}>Home</Link>
      </form>
    </>
  );
}
