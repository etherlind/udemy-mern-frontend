import React, { useEffect, useState } from 'react';

import UsersList from '../components/UsersList';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedUsers, setLoadedUsers] = useState(false);

  // the useEffect hook allows to run some code only when some dependency is changed
  useEffect(
    () => {
      // the function we pass to useEffect is not expected to return a promise,
      // so it's not a good practice to do  useEffect(async()=>...
      // instead, we define a new async function inside and run it
      const sendRequest = async () => {
        setIsLoading(true);

        try {
          // the default fetch request is a GET request
          const response = await fetch('http://localhost:5000/api/users');
          const responseData = await response.json();

          if (!response.ok) {
            throw new Error(responseData.message);
          }
          setLoadedUsers(responseData.users);
        } catch (error) {
          setError(error.message);
        }
        setIsLoading(false);
      };
      sendRequest();
    },
    // the array of data that needs to change in order for the code to be executed
    // if it's empty, it will never re-run (it will run only once)
    []
  );

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
