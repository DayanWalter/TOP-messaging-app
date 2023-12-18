import { Link, useLoaderData } from 'react-router-dom';
import styles from './PrivateChat.module.css';
import Message from './Message';
import { useEffect, useState } from 'react';
import SendMessageForm from './SendMessageForm';

export default function ChatRoom() {
  // Get params for receiver
  const loaderData = useLoaderData();
  const receiverId = loaderData.id;

  const token = localStorage.getItem('jwtoken');

  const [messages, setMessages] = useState();
  const [userName, setUsername] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getName = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/user/${receiverId}`
        );
        if (!response.ok) {
          console.error('Error:', response.statusText);
        }

        const userData = await response.json();
        setUsername(userData.username);
        console.log(userData.username);
      } catch (error) {
        setError(error.message);
        setMessages(null);
      } finally {
        setLoading(false);
      }
    };
    getName();
  }, [receiverId]);

  // create chatroom
  useEffect(() => {
    const getMessagesFromReceiver = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/message/${receiverId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        if (!response.ok) {
          console.error('Error:', response.statusText);
        }

        const data = await response.json();
        setMessages(data);
        setError(null);
      } catch (error) {
        setError(error.message);
        setMessages(null);
      } finally {
        setLoading(false);
      }
    };
    getMessagesFromReceiver();
  }, [receiverId]);
  console.log(messages);
  return (
    <>
      <div className={styles.site}>
        <div className={styles.content}>
          {loading && <p>Loading...</p>}
          {error && <p>Error</p>}
          {messages && (
            <>
              <header className={styles.header}>
                {userName && <h1>{userName}</h1>}
              </header>
              <main className={styles.main}>
                {/* Map over the messages */}
                <ul>
                  {messages &&
                    messages.messages.map(
                      ({ _id, text, sender, timestamp }) => (
                        <li key={_id}>
                          <Link to={`/home/viewprofile/${_id}`}>
                            {sender.username}
                          </Link>
                          {/* {receiver && <p>{receiver.messages}</p>} */}

                          <Message text={text} time={timestamp} />
                        </li>
                      )
                    )}
                </ul>
              </main>
              <footer className={styles.footer}>
                <SendMessageForm />
              </footer>
            </>
          )}
        </div>
      </div>
    </>
  );
}
