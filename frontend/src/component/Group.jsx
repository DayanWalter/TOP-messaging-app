import { Link } from 'react-router-dom';
import styles from './Group.module.css';
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
    sender: 'Fred',
    text: 'Hey Pete, how are you?',
    time: '12:30',
  },
  {
    _id: 4,
    sender: 'Pete',
    text: 'Thanks Fred, I am fine! Where are you from? What ist your favourite dish?',
    time: '12:30',
  },
];
let nextMessageId = 5;
let hours = new Date().getHours();
let minutes = new Date().getMinutes();

export default function Group() {
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
              {messages.map(({ _id, sender, text, time }) => (
                <li key={_id}>
                  {/* Add ${id} for real people */}
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
