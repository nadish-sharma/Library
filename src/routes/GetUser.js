import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function GetUser() {
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleGetUser = () => {
    axios.get(`http://localhost:8080/api/user/${userId}`)
    .then(response => {
      console.log({userId});
      setUser(response.data);
      console.log(response.data)
      if(response.data==null) {
        console.log("User not found");
        setError("No such User Exists");
      }
      else { 
        setError(null);
      }
    })
    .catch(error => {
        
        if (error.response && error.response.status === 404) {
            setError("Please enter your User ID");
            setUser(null);
            console.log(error);
        }
    });
  }

  return (
    <>
    <Navbar />
    <div style={{marginTop: '12em'}}>
      <h2>Get User by ID</h2>
      <form onSubmit={e => { e.preventDefault(); handleGetUser(); }}>
        <label>
          User ID:
          <input type="text" value={userId} onChange={e => setUserId(e.target.value)} />
        </label>
        <button type="submit">Get User</button>
      </form>
      {error && <p>{error}</p>}
      {user && (
        <div>
          <h3>User Details</h3>
          <p>First Name: {user.firstName}</p>
          <p>Last Name: {user.lastName}</p>
          <p>Email: {user.email}</p>
          <p>Admin: {user.admin ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
    </>
  );
}

export default GetUser;
