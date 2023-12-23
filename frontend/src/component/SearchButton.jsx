import { Link } from 'react-router-dom';

export default function SearchButton({ type }) {
  return (
    <>
      <Link to={`/home/${type}list`}>
        <button>Search {type}</button>
      </Link>
    </>
  );
}
