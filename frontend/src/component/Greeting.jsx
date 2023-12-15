import styles from './ViewProfile.module.css';

export default function Greeting() {
  const token = localStorage.getItem('jwtoken');
  // Split the payload of the jwt and convert the username-part
  const payload = JSON.parse(atob(token.split('.')[1]));
  // Define the username you are looking for
  const username = payload.username;
  return (
    <>
      <div className={styles.site}>
        Hello, {username}. Nice to see you again.
      </div>
    </>
  );
}
