import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SearchUser() {
  return (
    <>
      <Link to={`/home/userlist`}>
        <button>Search User</button>
      </Link>
    </>
  );
}
