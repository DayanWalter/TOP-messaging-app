import styles from './ChatRoom.module.css';
import { Link } from 'react-router-dom';
import ChatRoomMessage from './ChatRoomMessage';
import { useState } from 'react';

const exampleMessages = [
  {
    id: 1,
    from: 'Pete',
    message: 'Hey there!',
    time: '12:30',
  },
  {
    id: 2,
    from: 'Pete',
    message: 'Hello?!',
    time: '12:30',
  },
  {
    id: 3,
    from: 'Fred',
    message: 'Hey Pete, how are you?',
    time: '12:30',
  },
  {
    id: 4,
    from: 'Pete',
    message:
      'Thanks Fred, I am fine! Where are you from? What ist your favourite dish?',
    time: '12:30',
  },
];
let nextMessageId = 5;
export default function ChatRoom() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(exampleMessages);
  // Offline messages
  const onFormSubmit = (e) => {
    e.preventDefault();
    setMessages([
      ...messages,
      {
        id: nextMessageId++,
        from: 'Me',
        message,
        time: '12:35',
      },
    ]);
  };
  console.log(messages);
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
              {messages.map(({ id, from, message, time }) => (
                <li key={id}>
                  <ChatRoomMessage from={from} message={message} time={time} />
                </li>
              ))}
            </ul>
          </main>
          <footer className={styles.footer}>
            <form onSubmit={onFormSubmit}>
              <input
                type="text"
                placeholder="Enter message..."
                value={message}
                onChange={(e) => setMessage(e.currentTarget.value)}
              />
              <button type="submit">Submit</button>
            </form>
          </footer>
        </div>
      </div>
    </>
  );
}
