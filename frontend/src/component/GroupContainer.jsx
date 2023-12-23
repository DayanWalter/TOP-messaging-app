import { Link } from 'react-router-dom';
import ListCard from './ListCard';
import { useEffect, useState } from 'react';

export default function GroupContainer() {
  const token = localStorage.getItem('jwtoken');

  // Get all groups and display them in the sidebar
  const [group, setGroup] = useState(null);
  const [groupError, setGroupError] = useState(null);
  const [groupLoading, setGroupLoading] = useState(true);

  useEffect(() => {
    const getGroups = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/groups`,

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

        const groups = await response.json();

        setGroup(groups);
        setGroupError(null);
      } catch (error) {
        setGroupError(error.message);
        setGroup(null);
      } finally {
        setGroupLoading(false);
      }
    };
    getGroups();
  }, []);
  return (
    <>
      {groupLoading && <p>Loading...</p>}
      {groupError && <p>Error</p>}
      {group && (
        <ul>
          {group.allGroups.map(({ _id, groupname }) => (
            <li key={_id}>
              {/* Add ${id} for real rooms*/}
              <Link to={`/home/group/${_id}`}>
                <ListCard name={groupname} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
