import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ListCard from './ListCard';

export default function DataFetch({ url, isActive, type }) {
  const token = localStorage.getItem('jwtoken');
  // Split the payload of the jwt and convert the username-part
  const payload = JSON.parse(atob(token.split('.')[1]));
  // Define the username you are looking for
  const activeUser = payload.name;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchData() {
    try {
      const response = await fetch(
        url,

        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        throw new Error(`This is an Http error - Status:${response.status} `);
      }
      let actualData = await response.json();
      setData(actualData);
      setError(null);
    } catch (err) {
      setError(error.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (isActive) {
      fetchData();
    }
  }, [url, isActive]);

  console.log(data);
  return (
    <>
      {loading && <div>...</div>}
      {error && <div>{`There is a problem fetching the data - ${error}`}</div>}

      <ul>
        {data &&
          data.all.map(({ _id, name, groupname }) =>
            // If data is user data...
            name ? (
              // (Don't show logged in user)
              activeUser !== name ? (
                <li key={_id}>
                  <Link to={`/home/${type}/${_id}`}>
                    <ListCard name={name} />
                  </Link>
                </li>
              ) : null
            ) : (
              // else show group data
              <li key={_id}>
                <Link to={`/home/${type}/${_id}`}>
                  <ListCard name={groupname} />
                </Link>
              </li>
            )
          )}
      </ul>
    </>
  );
}
