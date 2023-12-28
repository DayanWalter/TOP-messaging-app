import styles from './SiteContainer.module.css';

export default function SiteContainer({ children }) {
  return (
    <div className={styles.content}>
      <div>{children}</div>
    </div>
  );
}
