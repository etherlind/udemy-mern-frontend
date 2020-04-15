import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'Saul Goodman',
      image: 'https://vignette.wikia.nocookie.net/villains/images/6/64/-saul-goodman-.jpg',
      places: 3
    }
  ];

  return <UsersList items={USERS} />;
};

export default Users;
