import React from 'react';

function UserList({ users, handleDeleteUser }) {
  return (
    <div>
      <h2>All Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.userId}>
            {user.userId} {user.firstName} {user.lastName} {user.email}
            <button onClick={() => handleDeleteUser(user.userId)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
