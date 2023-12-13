import styles from './ListCard.module.css';

export default function ListCard({ name }) {
  return (
    <div className={styles.chat}>
      <p>{name}</p>
    </div>
  );
}
