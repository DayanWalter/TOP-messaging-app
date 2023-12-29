import { useState, useEffect } from 'react';

export default function DataFetch({ url }) {
  const token = localStorage.getItem('jwtoken');

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
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
    getData();
  }, []);
  console.log(data);
  return (
    <div className="App">
      <h1>API Posts</h1>
      {loading && <div>A moment please...</div>}
      {error && <div>{`There is a problem fetching the data - ${error}`}</div>}

      <ul>
        {data &&
          data.all.map(({ _id, groupname }) => (
            <li key={_id}>
              <h3>{groupname}</h3>
            </li>
          ))}
      </ul>
    </div>
  );
}
