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
    // e.preventDefault();
    // POST the signup values from input
    try {
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
      const json = await response.json();
      console.log(json);
      // Navigate after successful SignUp to login page
      navigate('/home');
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
      <Button text={'Add Group'} />
    </form>
  );
}
