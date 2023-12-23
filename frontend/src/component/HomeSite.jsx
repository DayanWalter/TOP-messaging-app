import { Outlet } from 'react-router-dom';
import styles from './HomeSite.module.css';
import SideBar from './SideBar';

export default function HomeSite() {
  return (
    <>
      <div className={styles.site}>
        <aside className={styles.sidebar}>
          <SideBar />
        </aside>
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </>
  );
}
