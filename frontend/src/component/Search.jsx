import { Link } from 'react-router-dom';

export default function SearchUser({ type }) {
  return (
    <>
      <Link to={`/home/${type}list`}>
        <button>Search {type}</button>
      </Link>
    </>
  );
}
