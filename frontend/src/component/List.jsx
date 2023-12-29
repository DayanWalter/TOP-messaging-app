import { useState } from 'react';
import { Link } from 'react-router-dom';
import ListCard from './ListCard';
import styles from './List.module.css';
export default function List({ type, search }) {
  const token = localStorage.getItem('jwtoken');
  // Split the payload of the jwt and convert the username-part
  const payload = JSON.parse(atob(token.split('.')[1]));
  // Define the username you are looking for
  const activeUser = payload.username;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/${type}s?${type}name=${encodeURIComponent(
          search
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        console.error('Error:', response.statusText);
      }

      const jsonData = await response.json();

      setData(jsonData);
      setError(null);
    } catch (error) {
      setError(error.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <p>People:</p>
      {loading && <p>Enter a name...</p>}
      {error && <p>Error</p>}
      {data && (
        <ul>
          {/* Map over all user an display them */}
          {data.allData.map(({ _id, name }) =>
            // Display alle users, except logged in user
            activeUser !== name ? (
              <li key={_id}>
                {/* Add ${id} for real people */}
                <Link to={`/home/${type}/${_id}`}>
                  <ListCard name={name} />
                </Link>
              </li>
            ) : null
          )}
        </ul>
      )}
    </div>
  );
}
