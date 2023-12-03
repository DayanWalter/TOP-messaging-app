import styles from './ChatRoom.module.css';

export default function ChatRoomMessage({ from, message }) {
  return (
    <>
      <div className={styles.container}></div>
      <p>{from}</p>
      <p>{message}</p>
    </>
  );
}
