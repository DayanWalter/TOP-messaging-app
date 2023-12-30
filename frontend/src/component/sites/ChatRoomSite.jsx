import { Link, useLoaderData } from 'react-router-dom';
import styles from './ChatRoomSite.module.css';
import MessageCard from '../MessageCard';
import { useEffect, useState } from 'react';
import SendMessageForm from '../forms/SendMessageForm';
import Site from './Site';

export default function ChatRoomSite() {
  // Get params for receiver
  const loaderData = useLoaderData();
  const receiverId = loaderData.id;
  const receiverType = loaderData.type;

  const token = localStorage.getItem('jwtoken');
  // Split the payload of the jwt and convert the username-part
  const payload = JSON.parse(atob(token.split('.')[1]));
  // Define the username you are looking for
  const username = payload.username;

  const [name, setName] = useState();
  const [messages, setMessages] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);
  const [linkVisible, setLinkVisible] = useState(true);
  useEffect(() => {
    const getName = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/${receiverType}/${receiverId}`,
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
        console.log(data);
        // If data.username is available setName to username, else setName to name
        data.name ? setName(data.name) : setName(data.groupname);

        data.name ? setLinkVisible(true) : setLinkVisible(false);
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
          `http://localhost:3000/api/message/${receiverType}/${receiverId}`,
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
        setRefetch(false);
        setLoading(false);
      }
    };
    getMessagesFromReceiver();
  }, [receiverId, refetch]);
  return (
    <div className={styles.chatroomcontent}>
      {loading && <p>Loading...</p>}
      {error && <p>Error</p>}
      {messages && (
        <Site>
          {linkVisible ? (
            <Link to={`/home/viewprofile/${receiverId}`}>
              <header className={styles.header}>
                {name && <h1>{name}</h1>}
              </header>
            </Link>
          ) : (
            <header className={styles.header}>{name && <h1>{name}</h1>}</header>
          )}
          <main className={styles.main}>
            <ul>
              {messages.messages.map(({ _id, text, sender, timestamp }) =>
                sender.name !== name ? (
                  <li key={_id}>
                    <MessageCard text={text} time={timestamp} sender={sender} />
                  </li>
                ) : (
                  <li className={styles.messageContainerSender} key={_id}>
                    <MessageCard text={text} time={timestamp} sender={sender} />
                  </li>
                )
              )}
            </ul>
          </main>
          <footer className={styles.footer}>
            <SendMessageForm refetch={() => setRefetch(true)} />
          </footer>
        </Site>
      )}
    </div>
  );
}
