import styles from './GreetingSite.module.css';

export default function GreetingSite() {
  const token = localStorage.getItem('jwtoken');
  // Split the payload of the jwt and convert the username-part
  const payload = JSON.parse(atob(token.split('.')[1]));
  // Define the username you are looking for
  const name = payload.name;
  return (
    <>
      <div className={styles.site}>Hello, {name}. Nice to see you again.</div>
    </>
  );
}
