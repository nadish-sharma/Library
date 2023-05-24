import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function DeleteUser() {
  const [userId, setUserId] = useState('');

  const handleDeleteUser = () => {
    axios.delete(`http://localhost:8080/api/user/${userId}`)
      .then(() => console.log(`User with ID ${userId} deleted.`))
      .catch(error => console.error(error));
  }

  return (
    <>
    <Navbar />
    <div style={{marginTop: '12em'}}>
      <h2>Delete User</h2>
      <form onSubmit={e => { e.preventDefault(); handleDeleteUser(); }}>
        <label>
          User ID:
          <input type="text" value={userId} onChange={e => setUserId(e.target.value)} />
        </label>
        <button type="submit">Delete User</button>
      </form>
    </div>
    </>
  );
  
}

export default DeleteUser;
