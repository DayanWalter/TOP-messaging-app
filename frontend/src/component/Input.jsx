import styles from './Input.module.css';

export default function Input({
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
}) {
  return (
    <>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={styles.input}
      />
    </>
  );
}
