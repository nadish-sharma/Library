import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useEffect } from 'react';
import './GetUserStyles.css';
import UpdateUser from './UpdateUser';
import IssueBooks from './IssueBooksModal';

function GetUser() {
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showDeleteUserMessage, setShowDeleteUserMessage] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [admin, setAdmin] = useState(false);
  

  const handleClose = (event) => {
    // Check if the click is on the close button or outside the inner-box div
    if (
      event.target.className === 'overlay' ||
      event.target.className === 'close'  
      // event.target.className === 'add-button-final'  ||
      // event.target.className === 'edit-button-final'
    ) {
      setShowAddUserModal(false);
      setShowEditUserModal(false);
    }
  };


  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    const filteredUsers = users.filter(
      (user) =>
        user.userId.includes(searchTerm) ||
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setUsers(filteredUsers);
  };
  
  const handleEditButtonClick = (user) => {
    setShowEditUserModal(true);
    setShowAddUserModal(false);
    setShowDeleteUserMessage(false);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setPassword(user.password);
    setAdmin(user.admin);
  };
  
  const handleUpdateUser = () => {
    axios
      .put(`http://localhost:8080/api/user/${userId}`, {
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        admin: admin
      })
      .then((response) => {
        console.log(response.data);
        setUsers((prevUsers) =>
          prevUsers.map((u) => (u.userId === user.userId ? response.data : u))
        );
        setShowEditUserModal(false);
      })
      .catch((error) => console.error(error));
  };
  
  const handleAddUser = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8080/api/user`, {
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        admin: admin
      })
      .then((response) => {
        console.log(response.data);
        setUsers((prevUsers) => [...prevUsers, response.data]);
        setUser(response.data);
        setUserId('');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setAdmin(false);
        setShowAddUserModal(false);
      })
      .catch((error) => {
        console.error(error);
        setError("User not added!");
      });
  };
  
  const handleDeleteButtonClick = (userId) => {
    axios
      .delete(`http://localhost:8080/api/user/${userId}`)
      .then(() => {
        console.log(`User with ID ${userId} deleted.`);
        setUsers((prevUsers) => prevUsers.filter((user) => user.userId !== userId));
        setShowDeleteUserMessage(true);
      })
      .catch((error) => console.error(error));
  };
  
  useEffect(() => {
    handleGetAllUsers();
  }, []);
  
  const handleGetAllUsers = () => {
    axios
      .get('http://localhost:8080/api/user')
      .then((response) => {
        setUsers(response.data);
        setError(null);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setError('Please enter your User ID');
          setUsers([]);
          console.log(error);
        }
      });
  };
  
  return (
    <>
      <Navbar />
    <div className='get-user-container'>
      <div className="search-add-container">
        <div className="search-bar-container">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search by ID or username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type='submit'>Search</button>
          </form>
        </div>
        <div className="add-user-button-container">
          <button className="add-user-button" onClick={() => {setShowEditUserModal(false); setShowAddUserModal(true);}}>
            Add User
          </button>
        </div>
      </div>
        {error && <p className="error">{error}</p>}
      <div className='table-container'>
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Admin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
  {searchTerm === ''
    ? users.map((user) => (
        <tr key={user.userId}>
          <td>{user.userId}</td>
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
          <td>{user.email}</td>
          <td>{user.password}</td>
          <td>{user.admin ? 'Yes' : 'No'}</td>
          <td className='action-buttons'>
            <button
              className='edit-button'
              onClick={() => {
                handleEditButtonClick(user);
                setUserId(user.userId);
              }}
            >
              Edit
            </button>
            <button
              className='delete-button'
              onClick={() => handleDeleteButtonClick(user.userId)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))
    : users
        .filter(
          (user) =>
            user.userId.includes(searchTerm) ||
            user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((user) => (
          <tr key={user.userId}>
            <td>{user.userId}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.password}</td>
            <td>{user.admin ? 'Yes' : 'No'}</td>
            <td className='action-buttons'>
              <button
                className='edit-button'
                onClick={() => {
                  handleEditButtonClick(user);
                  setUserId(user.userId);
                }}
              >
                Edit
              </button>
              <button
                className='delete-button'
                onClick={() => handleDeleteButtonClick(user.userId)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
</tbody>

        </table>
      </div>
        {showEditUserModal && (
        <div className="overlay" onClick={handleClose}>
         <div className="overlay-inner">
          <button className="close" onClick={handleClose}><i className="fas fa-times"></i></button>
          <div className="inner-box">   
          
            <h2>Update User</h2>
            <form className='update-book-form' onSubmit={handleUpdateUser}>
              {/* <label>
                User ID:
                <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} required />
              </label> */}
              <label>
                First Name:
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
              </label>
              <label>
                Last Name:
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
              </label>
              <label>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </label>
              <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </label>
              <label>
                Admin:
                <input type="checkbox" checked={admin} onChange={(e) => setAdmin(e.target.checked)} />
              </label>
              <button className ='edit-button-final' type="submit">Update User</button>
            </form>
          </div>
          </div>
          </div>
        )}


        {showAddUserModal && (
          <div className="overlay" onClick={handleClose}>
          <div className="overlay-inner">
           <button className="close" onClick={handleClose}><i className="fas fa-times"></i></button>
           <div className="inner-box">   
            <h2>Add User</h2>
            <form className='add-user-form' onSubmit={handleAddUser}>
              <label>
                User Id:
                <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} required />
              </label>
              <label>
                First Name:
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
              </label>
              <label>
                Last Name:
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
              </label>
              <label>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </label>
              <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </label>
              <label>
                Admin:
                <input type="checkbox" checked={admin} onChange={(e) => setAdmin(e.target.checked)} />
              </label>
              <button className ='add-button-final' type="submit">Add User</button>
            </form>
          </div>
        </div>
        </div>
        )}
      
      </div>
    </>
  );
};

export default GetUser;
