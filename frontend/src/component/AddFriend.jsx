import { Link, useLoaderData } from 'react-router-dom';
import styles from './ViewProfile.module.css';
import { useEffect, useState } from 'react';
export default function AddFriend({ friendId }) {
  const token = localStorage.getItem('jwtoken');
  // Split the payload of the jwt and convert the username-part
  const payload = JSON.parse(atob(token.split('.')[1]));
  // Define the username you are looking for
  const username = payload.username;

  const [userdata, setUserdata] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  //fetch data for user

  const addFriend = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/user/${friendId}/add`,

        {
          method: 'POST',
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
      setUserdata(data);
    } catch (error) {
      setError(error.message);
      setUserdata(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button onClick={addFriend}>Add Friend</button>
    </>
  );
}
