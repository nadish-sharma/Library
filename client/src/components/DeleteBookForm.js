import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function DeleteUser() {
  const [bookId, setBookId] = useState('');
  const [deleteCheck, setDeleteCheck] = useState(false);

  const handleDeleteBook = () => {
    axios.delete(`http://localhost:8080/api/user/${bookId}`)
      .then(() => console.log(`User with ID ${bookId} deleted.`))
      .catch(error => console.error(error));
    setDeleteCheck(true);
  }

  return (
    <>
    <Navbar />
    <div style={{marginTop: '12em'}}>
      <h2>Delete Book</h2>
      <form onSubmit={e => { e.preventDefault(); handleDeleteBook(); }}>
        <label>
          Book ID:
          <input type="text" value={bookId} onChange={e => setBookId(e.target.value)} />
        </label>
        <button type="submit">Delete User</button>
      </form>
      {}
    </div>
    </>
  );
  
}

export default DeleteUser;
