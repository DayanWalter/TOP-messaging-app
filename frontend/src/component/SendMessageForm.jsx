import { useLoaderData } from 'react-router-dom';
import { useState } from 'react';
import Input from './Input';

export default function SendMessageForm({ refetch }) {
  // Get params for receiver
  const loaderData = useLoaderData();
  const receiverId = loaderData.id;
  const receiverType = loaderData.type;

  const token = localStorage.getItem('jwtoken');

  // Save text from input
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
        // Receiver is in the params
        `http://localhost:3000/api/message/${receiverType}/${receiverId}/create`,
        {
          method: 'POST',
          // Just the text is send via body
          body: JSON.stringify(formData),

          headers: {
            // Sender is in the token
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const json = await response.json();
      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      // Refetch for immediate display
      refetch();
      setFormData({ text: '' });
    }
  };
  return (
    <>
      <form onSubmit={formSubmit}>
        <Input
          name={'text'}
          type={'text'}
          placeholder={'Enter message...'}
          value={formData.text}
          onChange={handleChange}
        />
      </form>
    </>
  );
}
