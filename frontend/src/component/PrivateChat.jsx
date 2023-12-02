import { Link } from 'react-router-dom';

export default function PrivateChat() {
  return (
    <>
      <p>PrivateChat</p>
      <Link to={'/home'}>Home</Link>
    </>
  );
}
