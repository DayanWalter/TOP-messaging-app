import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import logo from '/logo.svg';
import { useState } from 'react';
import LoginForm from './LoginForm';

export default function Login() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.companyLogo}>
          <img src={logo} alt="" />
          <h1>Chatty</h1>
        </div>
        <LoginForm />
      </main>
    </>
  );
}
