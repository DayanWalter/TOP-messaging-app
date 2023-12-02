import { Outlet } from 'react-router-dom';
import styles from './Home.module.css';
import SideBar from './SideBar';

export default function Home() {
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
