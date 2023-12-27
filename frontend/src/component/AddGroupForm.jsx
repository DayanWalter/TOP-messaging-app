import Input from './Input';
import Button from './Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddGroupForm() {
  const token = localStorage.getItem('jwtoken');
  const navigate = useNavigate();

  const [formdata, setFormdata] = useState({
    groupname: '',
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
      if (formdata.groupname.length < 5) {
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
      console.log(data);
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
    <form onSubmit={handleAddGroup}>
      <Input
        name={'groupname'}
        id={'groupname'}
        value={formdata.groupname}
        placeholder={'Enter new groupname'}
        onChange={handleInputChange}
      />
      {errors && <p style={{ color: 'red' }}>{errors}</p>}
      <Button text={'Add Group'} />
    </form>
  );
}
