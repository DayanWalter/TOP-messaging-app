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

export default function ChatRoom() {
  // Get params for receiver
  const loaderData = useLoaderData();
  // console.log(loaderData.id);

  const token = localStorage.getItem('jwtoken');
  // Split the payload of the jwt and convert the username-part
  const payload = JSON.parse(atob(token.split('.')[1]));
  // Define the Username you are looking for
  const searchedUsername = payload.username;

  const [friend, setFriend] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const [messages, setMessages] = useState(exampleMessages);

  // Save input from form
  const [formData, setFormData] = useState({
    username: '',
    text: '',
  });

  // hardcore the _id first
  const sender = { _id: 'Dave._id' };
  // at every keystroke, change the formdata
  const handleChange = (e) => {
    const newMessage = {
      ...formData,
      text: e.currentTarget.value,
      // _id from the sender
      username: sender._id,
    };
    setFormData(newMessage);
  };
  console.log(formData);
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
  // console.log(friend);

  // Offline
  const formSubmit = (e) => {
    e.preventDefault();
    // send text, sender and receiver to backend
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
            <form onSubmit={formSubmit}>
              <input
                type="text"
                placeholder="Enter message..."
                value={formData.text}
                onChange={handleChange}
              />
            </form>
          </footer>
        </div>
      </div>
    </>
  );
}
