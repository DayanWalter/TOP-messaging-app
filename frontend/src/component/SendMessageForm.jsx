import { Link, useLoaderData } from 'react-router-dom';
import styles from './PrivateChat.module.css';
import Message from './Message';
import { useEffect, useState } from 'react';

export default function SendMessageForm() {
  // Get params for receiver
  const loaderData = useLoaderData();
  const receiverId = loaderData.id;
  // console.log(loaderData.id);

  const token = localStorage.getItem('jwtoken');
  // Split the payload of the jwt and convert the username-part
  const payload = JSON.parse(atob(token.split('.')[1]));
  // Define the Username you are looking for
  const senderId = payload._id;

  // Save input from form
  const [formData, setFormData] = useState({
    text: '',
  });

  // at every keystroke, change the formdata
  const handleChange = (e) => {
    const { name, value } = e.target;

    const newMessage = {
      ...formData,
      [name]: value,
    };
    setFormData(newMessage);
  };

  // Post message to receiver
  const formSubmit = async (e) => {
    e.preventDefault();
    // POST text, sender and receiver to backend
    try {
      const response = await fetch(
        `http://localhost:3000/api/message/${receiverId}/create`,
        {
          method: 'POST',
          // Just the text is send via body
          body: JSON.stringify(formData),

          headers: {
            Authorization: `Bearer ${token}`,
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
      <form onSubmit={formSubmit}>
        <input
          name="text"
          type="text"
          placeholder="Enter message..."
          value={formData.text}
          onChange={handleChange}
        />
      </form>
    </>
  );
}
