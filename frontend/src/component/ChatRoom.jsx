import styles from './ChatRoom.module.css';
import { Link } from 'react-router-dom';
import ChatRoomMessage from './ChatRoomMessage';

export default function ChatRoom() {
  // Offline messages
  const messages = [
    {
      id: 1,
      from: 'Pete',
      message: 'Hey there!',
    },
    {
      id: 2,
      from: 'Pete',
      message: 'Hello?!',
    },
    {
      id: 3,
      from: 'Fred',
      message: 'Hey Pete, how are you?',
    },
  ];
  return (
    <>
      {/* <p>ChatRoom</p>
      <Link to={'/home'}>Home</Link> */}
      <div className={styles.site}>
        <div className={styles.content}>
          <header className={styles.header}>
            <h1>ChatRoom Name</h1>
          </header>
          <main className={styles.main}>
            {/* Map over the messages */}
            <ul>
              {messages.map(({ id, from, message }) => (
                <li key={id}>
                  <ChatRoomMessage from={from} message={message} />
                </li>
              ))}
            </ul>
          </main>
          <footer className={styles.footer}>
            <input type="text" placeholder="Enter message..." />
          </footer>
        </div>
      </div>
    </>
  );
}
