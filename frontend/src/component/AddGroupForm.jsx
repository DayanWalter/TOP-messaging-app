import Input from './Input';
import Button from './Button';

export default function AddGroupForm() {
  const handleAddGroup = (e) => {
    e.preventDefault();
    console.log('Add Group');
  };

  return (
    <form onSubmit={handleAddGroup}>
      <Input placeholder={'Enter new groupname'} />
      <Button text={'Add Group'} />
    </form>
  );
}
