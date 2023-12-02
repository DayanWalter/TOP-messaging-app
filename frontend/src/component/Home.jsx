import { Link, Outlet } from 'react-router-dom';
import styles from './Home.module.css';
export default function Home() {
  return (
    <>
      <p>Home</p>
      <aside className={styles.sidebar}>
        <ul>
          <Link to={'/home'}>Home</Link>
          <br />
          <Link to={'/home/chatroom'}>ChatRoom</Link>
          <br />
          <Link to={'/home/editprofile'}>EditProfile</Link>
          <br />
          <Link to={'/home/privatechat'}>PrivateChat</Link>
          <br />
          <Link to={'/home/viewprofile'}>ViewProfile</Link>
          <br />
          <Link to={'/logout'}>Logout</Link>
        </ul>
      </aside>
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
}
