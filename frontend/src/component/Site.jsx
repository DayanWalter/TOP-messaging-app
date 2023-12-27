import styles from './Site.module.css';
import SideBar from './SideBar';

export default function Site({ children }) {
  return (
    <>
      <div className={styles.site}>
        <aside className={styles.sidebar}>
          <SideBar />
        </aside>
        <main className={styles.main}>{children}</main>
      </div>
    </>
  );
}
