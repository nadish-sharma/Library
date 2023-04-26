import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function UpdateUser() {
  const [userId, setUserId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [admin, setadmin] =useState(false);

  const handleUpdateUser = () => {
    axios.put(`http://localhost:8080/api/user/${userId}`, {
      userId: userId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      admin: admin
    })
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  }

  return (
    <>
    <Navbar />
    <div style={{marginTop: '12em'}}>
      <h2>Update User</h2>
      <form onSubmit={e => { e.preventDefault(); handleUpdateUser(); }}>
        <label>
          User ID:
          <input type="text" value={userId} onChange={e => setUserId(e.target.value)} />
        </label>
        <label>
          First Name:
          <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
        </label>
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <label>
          Admin:
          <input type="checkbox" checked={admin} onChange={e => setadmin(e.target.checked)} />
        </label>
        <button type="submit">Update User</button>
      </form>
    </div>
    </>
  );
}

export default UpdateUser;
