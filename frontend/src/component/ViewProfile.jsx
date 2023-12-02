import { Link } from 'react-router-dom';

export default function ViewProfile() {
  return (
    <>
      <p>ViewProfile</p>
      <Link to={'/home'}>Home</Link>
    </>
  );
}
