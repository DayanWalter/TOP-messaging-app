import { Link } from 'react-router-dom';

export default function Logout() {
  return (
    <>
      <p>Logout</p>
      <Link to={'/'}>Login</Link>
    </>
  );
}
