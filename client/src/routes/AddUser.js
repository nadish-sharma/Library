import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import DeleteUser from './DeleteUser';

function AddUser(props) {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [admin, setadmin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:8080/api/user`, {
      userId: userId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      admin: admin
    })
    //   .then(response => console.log(response.data))
    //   .catch(error => console.error(error));
    .then(response => {
        console.log(response.data)
        setUser(response.data);
        setUserId('');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setadmin(false);
      })
      .catch(error => {
        console.error(error);
        setError("User not added!");
      });
  }

  return (
    <>
    <Navbar />
    <div style={{marginTop: '12em'}}>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
      <label>
          User Id:
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
        <button type="submit">Add User</button>
      </form>
      {error && <p>{error}</p>}
      {user && (
        <div>
          <h3>User Details</h3>
          <p>User Id: {user.userId}</p>
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

export default AddUser;
