import { Link } from 'react-router-dom';

export default function SearchButton({ type }) {
  return (
    <>
      <Link to={`/home/search`}>
        <button>Search</button>
      </Link>
    </>
  );
}
