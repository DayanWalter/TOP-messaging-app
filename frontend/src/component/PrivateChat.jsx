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

  const [receiver, setReceiver] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
        setReceiver(data);
        setError(null);
      } catch (error) {
        setError(error.message);
        setReceiver(null);
      } finally {
        setLoading(false);
      }
    };
    getMessagesFromReceiver();
  }, [loaderData]);
  console.log(receiver);
  return (
    <>
      <div className={styles.site}>
        <div className={styles.content}>
          {loading && <p>Loading...</p>}
          {error && <p>Error</p>}
          {receiver && (
            <>
              <header className={styles.header}>
                <h1>{receiver.username}</h1>
              </header>
              <main className={styles.main}>
                {/* Map over the messages */}
                <ul>
                  {receiver &&
                    receiver.messages.map(({ _id, sender, text, time }) => (
                      <li key={_id}>
                        <Link to={`/home/viewprofile/${_id}`}>{sender}</Link>
                        {/* {receiver && <p>{receiver.messages}</p>} */}

                        <Message text={text} time={time} />
                      </li>
                    ))}
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
