import styles from './Input.module.css';

export default function Input({ type, placeholder, value, onChange }) {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={styles.input}
      />
    </>
  );
}
