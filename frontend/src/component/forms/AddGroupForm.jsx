import Input from '../Input';
import Button from '../Button';
import { useState } from 'react';
import styles from './AddGroupForm.module.css';

export default function AddGroupForm() {
  const token = localStorage.getItem('jwtoken');

  const [formdata, setFormdata] = useState({
    name: '',
  });

  // Errors for input validation
  const [errors, setErrors] = useState('');

  const handleInputChange = (e) => {
    // Destructure e.target.value and fieldname
    const { name, value } = e.target;
    // Create new object
    const newFormdata = {
      ...formdata,
      [name]: value,
    };
    // set Formdata to new object
    setFormdata(newFormdata);
  };
  const handleAddGroup = async (e) => {
    e.preventDefault();
    // POST the signup values from input
    try {
      if (formdata.name.length < 5) {
        setErrors('Groupname must be at least 5 chars long');
        return;
      }

      const response = await fetch(`http://localhost:3000/api/group/create`, {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
          Authorization: `Bearer ${token}`,

          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error('Error:', response.statusText);
      }
      // else: successfull signup
      const data = await response.json();
      if (data.group) {
        console.log('Group created:', data.group);
      } else if (data.errors) {
        setErrors(data.errors);
        console.error(errors);
      }
      // Navigate after successful SignUp to login page
    } catch (error) {
      console.error('Error', error);
    }
  };
  return (
    <form onSubmit={handleAddGroup} className={styles.form}>
      <hr />
      <Input
        name={'name'}
        id={'name'}
        value={formdata.name}
        placeholder={'Enter new groupname'}
        onChange={handleInputChange}
        className={styles.input}
      />
      <Button text={'Add Group'} />
      {errors && <p style={{ color: 'red' }}>{errors}</p>}
      <hr />
    </form>
  );
}
