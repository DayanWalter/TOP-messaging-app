import styles from './Chat.module.css';

export default function Chat({ name }) {
  return (
    <div className={styles.chat}>
      <p>{name}</p>
    </div>
  );
}
