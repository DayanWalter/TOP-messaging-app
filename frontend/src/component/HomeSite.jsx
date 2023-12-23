import { Outlet } from 'react-router-dom';
import styles from './HomeSite.module.css';
import SideBar from './SideBar';
import GreetingSite from './GreetingSite';
import Site from './Site';
import UserList from './UserList';

export default function HomeSite() {
  return (
    <>
      <Site>
        <GreetingSite />
      </Site>
      {/* <div className={styles.site}>
        <aside className={styles.sidebar}>
          <SideBar />
        </aside>
        <main className={styles.main}>
          <GreetingSite />
        </main>
      </div> */}
    </>
  );
}
