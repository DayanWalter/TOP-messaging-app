import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ListCard from '../../../ListCard';

export default function FriendContainer() {
  const token = localStorage.getItem('jwtoken');
  // Split the payload of the jwt and convert the username-part
  const payload = JSON.parse(atob(token.split('.')[1]));
  // Define the username you are looking for
  const activeUser = payload.username;

  // Get all friends and display them in the sidebar
  const [user, setUser] = useState(null);
  const [userError, setUserError] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/friends`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          console.error('Error:', response.statusText);
        }

        const users = await response.json();

        setUser(users);
        setUserError(null);
      } catch (error) {
        setUserError(error.message);
        setUser(null);
      } finally {
        setUserLoading(false);
      }
    };
    getFriends();
  }, []);

  return (
    <>
      {userLoading && <p>Loading...</p>}
      {userError && <p>Error</p>}
      {user && (
        <ul>
          {/* Map over all user an display them */}
          {user.friends.map(({ _id, username }) =>
            // Display alle users, except logged in user
            activeUser !== username ? (
              <li key={_id}>
                {/* Add ${id} for real people */}
                <Link to={`/home/user/${_id}`}>
                  <ListCard name={username} />
                </Link>
              </li>
            ) : null
          )}
        </ul>
      )}
    </>
  );
}
