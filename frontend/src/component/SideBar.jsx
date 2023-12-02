import { Link } from 'react-router-dom';
import styles from './SideBar.module.css';

export default function SideBar() {
  return (
    <>
      <div className={styles.userIcon}></div>
      <Link to={'/home/viewprofile'}>ViewProfile</Link>

      <input type="text" placeholder="Search User" />
      <button>Search</button>
      <h1>People</h1>
      <div className="peopleContainer">
        <div className="person">User1</div>
        <div className="person">User2</div>
      </div>
      <Link to={'/home/privatechat'}>PrivateChat</Link>

      <h1>Chatroom</h1>
      <div className="chatroomContainer">
        <div className="chatroom">Chat1</div>
        <div className="chatroom">Chat2</div>
      </div>
      <Link to={'/home/chatroom'}>ChatRoom</Link>

      <div className="editLogoutContainer">
        <button>Edit Profile</button>
        <Link to={'/home/editprofile'}>EditProfile</Link>

        <button>Logout</button>
        <Link to={'/logout'}>Logout</Link>
      </div>

      <ul>
        <Link to={'/home'}>Home</Link>
        <br />
        <br />
        <br />
        <br />
        <br />
      </ul>
    </>
  );
}
