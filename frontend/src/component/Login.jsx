import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <>
      <p>Login</p>
      <Link to={'/home'}>Home</Link>
    </>
  );
}
