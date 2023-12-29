import { Link, useNavigate } from 'react-router-dom';
import styles from './SignUpSite.module.css';
import logo from '/logo.svg';
import { useState } from 'react';
export default function SignUpSite() {
  const navigate = useNavigate();

  const [formdata, setFormdata] = useState({
    name: '',
    email: '',
    password: '',
    confirmpassword: '',
  });
  const [errors, setErrors] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // POST the signup values from input
    try {
      if (formdata.name.length < 5) {
        setErrors('Name must be at least 5 chars long');
        return;
      }
      if (formdata.password.length < 3) {
        setErrors('Password must be at least 3 chars long');
        return;
      }
      if (formdata.password !== formdata.confirmpassword) {
        setErrors('Passwords are not the same');
        return;
      }
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
            name="name"
            id="name"
            placeholder="Choose name"
            value={formdata.name}
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
            name="confirmpassword"
            id="confirmpassword"
            placeholder="Repeat Password"
            value={formdata.confirmpassword}
            onChange={handleInputChange}
          />
          {errors && <p style={{ color: 'red' }}>{errors}</p>}

          <button type="submit">Sign Up</button>
          <Link to={'/'}>Login</Link>
        </form>
      </main>
    </>
  );
}
