import React, { useState } from 'react';
import './componentCSS/BookDescriptionModal.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BookViewer from '../routes/BookViewer';
import Home from '../routes/Home';
import Navbar from './Navbar';

const Modal = ({ setShowAddUserModal, showAddUserModal, setShowEditUserModal, showEditUserModal }) => {
  const [showViewer, setShowViewer] = useState(false);
  const [error, setError] = useState(null);

  const setBook = (bookStuff) => {
    book = bookStuff;
  }
  
  const onClose = () => {
    setShowViewer(false);
  }
  const handleClose = (event) => {
    // Check if the click is on the close button or outside the inner-box div
    if (
      event.target.className === 'overlay' ||
      event.target.className === 'close'    
    ) {
      onClose();
    }
  };

  if (!show) {
    return null;
  }
  
  if(showEditUserModal) {
  return (
    <>
      <div className="overlay" onClick={handleClose}>
        <div className="overlay-inner">
          <button className="close" onClick={onClose}><i className="fas fa-times"></i></button>
          <div className="inner-box">
            <div className="edit-user-modal">
                <h2>Update User</h2>
                <form onSubmit={handleUpdateUser}>
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
                <button type="submit">Update User</button>
                </form>
            </div>
          </div>
          <h4 className="description">{description}</h4>
        </div>
      </div>
      {showViewer && ( 
                      <div className="embedded-viewer">
                          {/* <Navbar/> */}
                          {/* <Home show={showViewer}/> */}
                          <BookViewer bookData={book} id={book.id} show={showViewer} />
                      </div>

      )}
    </>
  );
      } 
    if(showAddUserModal) {
        return (
            <>
              <div className="overlay" onClick={handleClose}>
                <div className="overlay-inner">
                  <button className="close" onClick={onClose}><i className="fas fa-times"></i></button>
                  <div className="inner-box">   
                    <div>
                        <h2>Add User</h2>
                        <form onSubmit={handleAddUser}>
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
                        <button type="submit">Add User</button>
                        </form>
                    </div>
                </div>
              </div>
            </div>
            </>
     );
 }
};

export default Modal;
