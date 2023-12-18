import styles from './Message.module.css';

export default function Message({ text, time }) {
  const convertedTime = new Date(time).toLocaleTimeString();
  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <p>&quot;{text}&quot;</p>
        </div>
        <div className={styles.right}>
          <p>{convertedTime}</p>
        </div>
      </div>
    </>
  );
}
