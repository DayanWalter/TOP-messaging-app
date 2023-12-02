import { Link } from 'react-router-dom';
import styles from './SideBar.module.css';
import Person from './Person';
import Chat from './Chat';

export default function SideBar() {
  const people = [
    {
      id: 1,
      name: 'Pete',
    },
    {
      id: 2,
      name: 'Fred',
    },
    {
      id: 3,
      name: 'Jeff',
    },
    {
      id: 4,
      name: 'Melissa',
    },
    {
      id: 5,
      name: 'Tina',
    },
  ];
  const chatroom = [
    {
      id: 1,
      name: 'Global',
    },
    {
      id: 2,
      name: 'Regional',
    },
    {
      id: 3,
      name: 'Nordlichter',
    },
    {
      id: 4,
      name: 'Lowcarb',
    },
  ];
  return (
    <>
      <div className={styles.sidebar}>
        <Link to={'/home/viewprofile'}>
          <div className={styles.userIcon}></div>
        </Link>
        <div className={styles.searchSection}>
          <input type="text" placeholder="Search User" />
          <button>Search</button>
        </div>

        <h1>People</h1>

        <div className={styles.personContainer}>
          <ul>
            {people.map(({ id, name }) => (
              <li key={id}>
                {/* Add ${id} for real people */}
                <Link to={`/home/privatechat`}>
                  <Person name={name} />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <h1>Chatroom</h1>

        <div className={styles.chatroomContainer}>
          <ul>
            {chatroom.map(({ id, name }) => (
              <li key={id}>
                {/* Add ${id} for real rooms*/}
                <Link to={`/home/chatroom`}>
                  <Chat name={name} />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.editLogoutContainer}>
          <Link to={'/home/editprofile'}>
            <button>Edit Profile</button>
          </Link>

          <Link to={'/logout'}>
            <button>Logout</button>
          </Link>
        </div>
      </div>
    </>
  );
}
