import { Link, useNavigate } from 'react-router-dom';
import styles from './LoginSite.module.css';
import logo from '/logo.svg';
import { useState } from 'react';
import LoginForm from './LoginForm';

export default function LoginSite() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.companyLogo}>
          <img src={logo} alt="Chatty Logo" />
          <h1>Chatty</h1>
        </div>
        <LoginForm />
      </main>
    </>
  );
}
