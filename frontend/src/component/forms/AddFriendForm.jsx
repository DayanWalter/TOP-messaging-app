import { useState } from 'react';
import Button from '../Button';

export default function AddFriendForm({ friendId }) {
  const token = localStorage.getItem('jwtoken');
  // Split the payload of the jwt and convert the username-part
  const payload = JSON.parse(atob(token.split('.')[1]));
  // Define the username you are looking for
  const username = payload.username;

  //fetch data for user

  const addFriend = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/user/${friendId}/add`,

        {
          method: 'PUT',
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
      <form onSubmit={addFriend}>
        <Button text={'Add Friend'} />
      </form>
    </>
  );
}
