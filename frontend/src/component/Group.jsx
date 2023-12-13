import styles from './Group.module.css';
import Message from './Message';
import { useState } from 'react';

// Offline
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
let hours = new Date().getHours();
let minutes = new Date().getMinutes();

export default function Group() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(exampleMessages);

  // Offline
  const onFormSubmit = (e) => {
    e.preventDefault();
    setMessages([
      ...messages,
      {
        id: nextMessageId++,
        from: 'Me',
        message,
        time: `${hours}:${minutes}`,
      },
    ]);
    setMessage('');
  };
  // console.log(messages);
  return (
    <>
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
                  <Message from={from} message={message} time={time} />
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
            </form>
          </footer>
        </div>
      </div>
    </>
  );
}
