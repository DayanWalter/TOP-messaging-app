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
  const receiverId = loaderData.id;
  // console.log(loaderData.id);

  const token = localStorage.getItem('jwtoken');
  // Split the payload of the jwt and convert the username-part
  const payload = JSON.parse(atob(token.split('.')[1]));
  // Define the Username you are looking for
  const senderId = payload._id;

  const [receiver, setReceiver] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState(exampleMessages);

  // Save input from form
  const [formData, setFormData] = useState({
    sender: '',
    receiver: '',
    text: '',
  });

  // at every keystroke, change the formdata
  const handleChange = (e) => {
    const { name, value } = e.target;

    const newMessage = {
      ...formData,
      [name]: value,
      sender: senderId,
      receiver: receiverId,
    };
    setFormData(newMessage);
  };
  console.log(formData);

  // create chatroom
  useEffect(() => {
    const getDetailsFromReceiver = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/user/${loaderData.id}`
        );
        if (!response.ok) {
          console.error('Error:', response.statusText);
        }

        const data = await response.json();

        setReceiver(data.user);
        setError(null);
      } catch (error) {
        setError(error.message);
        setReceiver(null);
      } finally {
        setLoading(false);
      }
    };
    getDetailsFromReceiver();
  }, [loaderData]);
  // console.log(Receiver);

  // Offline
  const formSubmit = async (e) => {
    e.preventDefault();
    // POST text, sender and receiver to backend
    try {
      const response = await fetch(
        `http://localhost:3000/api/message/${receiverId}/create`,
        {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const json = await response.json();
        console.log(json);
      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <>
      <div className={styles.site}>
        <div className={styles.content}>
          <header className={styles.header}>
            {receiver && <h1>{receiver.username}</h1>}
          </header>
          <main className={styles.main}>
            {/* Map over the messages */}
            <ul>
              {messages.map(({ _id, sender, text, time }) => (
                <li key={_id}>
                  <Link to={`/home/viewprofile/${_id}`}>{sender}</Link>
                  {receiver && <p>{receiver.messages}</p>}

                  <Message text={text} time={time} />
                </li>
              ))}
            </ul>
          </main>
          <footer className={styles.footer}>
            <form onSubmit={formSubmit}>
              <input
                name="text"
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
