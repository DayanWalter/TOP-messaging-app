import { Link, useLoaderData } from 'react-router-dom';
import styles from './PrivateChat.module.css';
import Message from './Message';
import { useEffect, useState } from 'react';

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
  // console.log(loaderData.id);

  const [friend, setFriend] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // create chatroom
  useEffect(() => {
    const getDetailsFromFriend = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/user/${loaderData.id}`
        );
        if (!response.ok) {
          console.error('Error:', response.statusText);
        }

        const data = await response.json();

        setFriend(data.user);
        setError(null);
      } catch (error) {
        setError(error.message);
        setFriend(null);
      } finally {
        setLoading(false);
      }
    };
    getDetailsFromFriend();
  }, [loaderData]);
  console.log(friend);

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
            {friend && <h1>{friend.username}</h1>}
          </header>
          <main className={styles.main}>
            {/* Map over the messages */}
            <ul>
              {messages.map(({ _id, sender, text, time }) => (
                <li key={_id}>
                  <Link to={`/home/viewprofile/${_id}`}>{sender}</Link>
                  {friend && <p>{friend.messages}</p>}

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
