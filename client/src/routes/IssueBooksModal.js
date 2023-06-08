import React, { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { useEffect } from 'react';
import IssueBooks from './IssueBooks';


function IssueBooksModal({showIssueBookModal, setShowIssueBookModal}) {

  const [selectedUser, setSelectedUser] = useState('');
  const [selectedBook, setSelectedBook] = useState('');
  const [bookData, setBookData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [issueDate, setIssueDate] = useState(new Date().toISOString().slice(0, 10));
  const [returnDate, setReturnDate] = useState(new Date().toISOString().slice(0, 10));

  const [expectedReturnDate, setExpectedReturnDate] = useState(new Date().toISOString().slice(0, 10));



  const handleCloseIssueBook = () => {
    setShowIssueBookModal(false);
  }
  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleBookChange = (e) => {
    setSelectedBook(e.target.value);
  };


  useEffect(() => {
    // Fetch user data
    axios.get('http://localhost:8080/api/user')
      .then(response => {
        const transformedUserData = { ...response.data };
        // transformedUserData._id = transformedUserData._id.toString();
        setUserData(transformedUserData);
        console.log({transformedUserData});
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });

    // Fetch book data
    axios.get('http://localhost:8080/api/book/available')
      .then(response => {
        const transformedBookData = { ...response.data };
        // transformedBookData._id = transformedBookData._id.toString();
        setBookData(transformedBookData);
        console.log({transformedBookData});

        
      })
      .catch(error => {
        console.error('Error fetching book data:', error);
      });
  }, []);

  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ selectedUser });
    console.log({ selectedBook });

    

  
    // Fetch the existing user data
    axios.get(`http://localhost:8080/api/user/${selectedUser}`)
      .then(response => {
        // const bookArray = [selectedBook]; // Convert the selectedBook to an array
        const userResponseData = response.data;
        // console.log({userResponseData});
        userResponseData.borrower = true;
        // userResponseData.borrowedBooks = bookArray;
  
        // Update the user data with the modified fields
        axios.put(`http://localhost:8080/api/user/${selectedUser}`, userResponseData)
          .then(response => console.log(`user put data:`+response.data))
          .catch(error => console.error(error));
      })
      .catch(error => console.error(error));
      
    // Fetch the existing book data
    axios.get(`http://localhost:8080/api/book/bookId/${selectedBook}`)
      .then(response => {
        const bookResponseData = response.data;
        // console.log({bookResponseData});
        bookResponseData.issueDate = issueDate;
        bookResponseData.expectedReturnDate = expectedReturnDate;
        bookResponseData.issuedTo = selectedUser;
        bookResponseData.status = 'issued';
        bookResponseData.available = false;
  
        // Update the book data with the modified fields
        axios.put(`http://localhost:8080/api/book/${selectedBook}`, bookResponseData)
          .then(response => console.log(response.data))
          .catch(error => console.error(error));
          console.log({bookResponseData});
      })
      .catch(error => console.error(error));
      
  };

  
 return (
  <>
   {showIssueBookModal && (
        <div className="overlay" >
          <div className="overlay-inner">
            <button className="close" onClick={handleCloseIssueBook}>
              <i className="fas fa-times"></i>
            </button>
            <div className="inner-box">
              <h2>Issue Book</h2>
              <form className="issue-book" onSubmit={handleSubmit} >
              <label className='jf'>
                User:
                <select value={selectedUser} onChange={handleUserChange} required>
                  <option value="">Select User</option>
                  {Object.values(userData).map((user) => (
                    <option key={`${user.id.timestamp}-${user.id.date}`} value={user.userId}>
                      {`${user.firstName} ${user.lastName}`}
                    </option>
                  ))}
                </select>
              </label>

              <label className='jf'>
                Available Books:
                <select value={selectedBook} onChange={handleBookChange} required>
                  <option value="">Select Book</option>
                  {Object.values(bookData).map((book) => (
                    <option key={`${book.id.timestamp}-${book.id.date}`} value={book.bookId}>
                      {`${book.title} by ${book.authorName}`}
                    </option>
                  ))}
                </select>
              </label>

                <label className='jf'>
                  Issue Date:
                  <input
                    type="datetime-local"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    pattern="\d{4}-\d{2}-\d{2}"
                    required
                  />
                </label>
                <label className='jf'>
                  Expected Return Date:
                  <input
                    type="datetime-local"
                    value={expectedReturnDate}
                    onChange={(e) => setExpectedReturnDate(e.target.value)}
                    pattern="\d{4}-\d{2}-\d{2}"
                    required
                  />
                </label>
                <div className="button-container">
                  <button className="save-button" type="submit">
                    Save
                  </button>
                  <button className="cancel-button" type="button">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
   )
  }
  
    </>  
   
  );
}
export default IssueBooksModal;
