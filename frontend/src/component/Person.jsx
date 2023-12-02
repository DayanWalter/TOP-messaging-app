import styles from './Person.module.css';

export default function Person({ name }) {
  return (
    <div className={styles.person}>
      <p>{name}</p>
    </div>
  );
}
