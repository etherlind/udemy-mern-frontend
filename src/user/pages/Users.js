import React, { useEffect, useState } from 'react';

import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
      // the function we pass to useEffect is not expected to return a promise,
      // so it's not a good practice to do  useEffect(async()=>...
      // instead, we define a new async function inside and run it
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest('http://localhost:5000/api/users');

        setLoadedUsers(responseData.users);
      } catch (err) {}
    };
    fetchUsers();
   // the array of data that needs to change in order for the code to be executed
    // if it's empty, it will never re-run (it will run only once)
    // sendRequest is a dependency of useEffect, that's also why it's important to use useCallback hook inside the custom hook
   }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
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
