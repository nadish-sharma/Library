import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useEffect } from 'react';
import './GetUserStyles.css';
import UpdateUser from './UpdateUser';

function IssueBooks() {
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showDeleteUserMessage, setShowDeleteUserMessage] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [books, setBooks] = useState([]);
  
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


  const handleSearch = () => {
    const filteredUsers = users.filter(
      (user) =>
        user.userId.includes(searchTerm) ||
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setUsers(filteredUsers);
  };
  
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch book data
    axios.get('http://localhost:8080/api/books/issued')
      .then(response => {
        const bookData = response.data;
        // Fetch user data
        axios.get('http://localhost:8080/api/users/borrowers')
          .then(response => {
            const userData = response.data;
            // Combine book and user data
            const combinedData = combineData(bookData, userData);
            setData(combinedData);
          })
          .catch(error => {
            console.error('Error fetching user data:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching book data:', error);
      });
  }, []);

  const combineData = (bookData, userData) => {
    // Combine book and user data based on matching book ID within the borrowedBooks list
    const combinedData = userData.map(user => {
      const borrowedBooks = user.borrowedBooks.map(bookId => {
        const book = bookData.find(book => book.bookId === bookId);
        return book ? book : null;
      });
      return {
        ...user,
        borrowedBooks,
      };
    });
    return combinedData;
  };
  
  // Usage:
  const combinedData = combineData(bookData, userData);
  

  
  return (
    <>
      <Navbar />
    <div className='container'>
      <div className="search-add-container">
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search by book or user..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="add-user-button-container">
          <button className="add-user-button" onClick={() => {setShowEditUserModal(false); setShowAddUserModal(true);}}>
            Issue Book
          </button>
        </div>
      </div>
        {error && <p className="error">{error}</p>}
      <div className='table-container'>
        <table>
          <thead>
            <tr>
              <th>Serial no.</th>
              <th>Book Title</th>
              <th>Book ID</th>
              <th>User</th>
              <th>Issue Date</th>
              <th>Expected Return</th>
              <th>Return Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.bookId}>
                <td>{book.bookId}</td>
                <td>{book.title}</td>
                <td>{book.bookId}</td>
                <td>{book.email}</td>
                <td>{book.password}</td>
                <td>{book.admin ? 'Yes' : 'No'}</td>
                <td className='action-buttons'>
                  <button className='edit-button' onClick={() => handleEditButtonClick()}>Edit</button>
                  <button className='delete-button' onClick={() => handleDeleteButtonClick(user.userId)}>Delete</button>
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
              <label>
                User ID:
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
              <button className ='edit-button-final' type="submit">Update User</button>
            </form>
          </div>
          </div>
          </div>
        )}
        
        {showDeleteUserMessage && (
          <div>
            <p>User deleted successfully</p>
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

export default IssueBooks;
