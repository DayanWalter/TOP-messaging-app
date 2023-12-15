import { Link, useLoaderData } from 'react-router-dom';
import styles from './PrivateChat.module.css';
import Message from './Message';
import { useState } from 'react';

// Offline
const exampleMessages = [
  {
    _id: 1,
    sender: 'Pete',
    text: 'Hey there!',
    time: '12:30',
  },
  {
    _id: 2,
    sender: 'Pete',
    text: 'Hello?!',
    time: '12:30',
  },

  {
    _id: 3,
    sender: 'Pete',
    text: 'Thanks, I am fine! Where are you from? What ist your favourite dish?',
    time: '12:30',
  },
];
let nextMessageId = 4;
let hours = new Date().getHours();
let minutes = new Date().getMinutes();

export default function ChatRoom() {
  // Get params
  const loaderData = useLoaderData();
  console.log(loaderData);

  // create chatroom
  // POST params to backend

  const [text, setText] = useState('');
  const [messages, setMessages] = useState(exampleMessages);

  // Offline
  const onFormSubmit = (e) => {
    e.preventDefault();
    setMessages([
      ...messages,
      {
        _id: nextMessageId++,
        sender: 'Me',
        text,
        time: `${hours}:${minutes}`,
      },
    ]);
    setText('');
  };
  return (
    <>
      <div className={styles.site}>
        <div className={styles.content}>
          <header className={styles.header}>
            <h1>PrivateChat Person Name</h1>
          </header>
          <main className={styles.main}>
            {/* Map over the messages */}
            <ul>
              {messages.map(({ _id, sender, text, time }) => (
                <li key={_id}>
                  <Link to={`/home/viewprofile/${_id}`}>{sender}</Link>
                  <Message text={text} time={time} />
                </li>
              ))}
            </ul>
          </main>
          <footer className={styles.footer}>
            <form onSubmit={onFormSubmit}>
              <input
                type="text"
                placeholder="Enter message..."
                value={text}
                onChange={(e) => setText(e.currentTarget.value)}
              />
            </form>
          </footer>
        </div>
      </div>
    </>
  );
}
