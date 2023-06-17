import React, { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useEffect } from 'react';
import IssueBooksModal from './IssueBooksModal';
import './IssueBooksStyles.css';


function IssueBooks() {

    const [showIssueBookModal, setShowIssueBookModal] = useState(false);
    const [issuedBookData, setIssuedBookData] = useState([]);
    const [issuedBookForTable, setIssuedBookForTable] = useState([]);
    const [userName, setUserName] = useState([]);
    const [borrowerUsers, setBorrowerUsers] = useState([]);
    const [borrowerStatus, setBorrowerStatus] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [editedStatus, setEditedStatus] = useState('');
    const [editingBookId, setEditingBookId] = useState('');
    const [showStatusOptions, setShowStatusOptions] = useState(false);
    const [filteredIssuedBooks, setFilteredIssuedBooks] = useState(issuedBookData);




    useEffect(() => {
        handleGetAllIssuedBooks();
      }, []);
    
      const fetchData = async () => {
        try {
          await Promise.all([handleGetAllIssuedBooks(), handleBorrowerUsers()]);
          setUserNameFromDatabase();
          console.log({issuedBookForTable});
        } catch (error) {
          console.error('Error fetching data:', error);
          setError('Error fetching data. Please try again.');
        }
      };
    
      const handleGetAllIssuedBooks = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/book/issued');
          const bookData = response.data;
          setIssuedBookData(bookData);
          console.log({issuedBookData});
        } catch (error) {
          console.error('Error fetching book data:', error);
          throw error;
        }
      };
    
      const handleBorrowerUsers = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/user/borrower/${borrowerStatus}`);
          const userData = response.data;
          setBorrowerUsers(userData);
          console.log({borrowerUsers});
        } catch (error) {
          console.error('Error fetching user data:', error);
          throw error;
        }
      };
    
      const setUserNameFromDatabase = () => {
        handleGetAllIssuedBooks();
        handleBorrowerUsers();
        const updatedBooks = issuedBookData.map((book) => {
          const matchingUser = borrowerUsers.find((user) => user.userId === book.issuedTo);
          if (matchingUser) {
            const updatedUserName = `${matchingUser.firstName} ${matchingUser.lastName}`;
            return { ...book, userName: updatedUserName };
          }
          return book;
        });
        setIssuedBookForTable(updatedBooks);
      };

      const handleDelete = (bookId) => {
        // Fetch the existing book data
        axios.get(`http://localhost:8080/api/book/bookId/${bookId}`)
        .then(response => {
        const bookResponseData = response.data;
        bookResponseData.status = 'returned';
        bookResponseData.available = true;
        bookResponseData.issuedTo = '';
        bookResponseData.issueDate = '';
        bookResponseData.expectedReturnDate = '';


        // Update the book data with the modified fields
        axios.put(`http://localhost:8080/api/book/${bookId}`, bookResponseData)
            .then(response => {
            console.log(response.data);
            // Remove the deleted book from the issuedBookData state
            const updatedBookData = issuedBookData.filter(book => book.bookId !== bookId);
            setIssuedBookData(updatedBookData);
            })
            .catch(error => console.error(error));
        })
        .catch(error => console.error(error));      
    };

    const handleSave = (bookId) => {
        // Fetch the existing book data
    // if(editedStatus!='issued') {
        axios.get(`http://localhost:8080/api/book/bookId/${bookId}`)
        .then(response => {
        const bookResponseData = response.data;
        bookResponseData.status = editedStatus;
        if(editedStatus==='issued') {
          bookResponseData.available = false;
            bookResponseData.issuedTo = bookResponseData.issueto;
            bookResponseData.issueDate = bookResponseData.issueDate;
            bookResponseData.expectedReturnDate = bookResponseData.expectedReturnDate;
            bookResponseData.status = bookResponseData.status;
        }
        if(editedStatus==='returned') {
            bookResponseData.available = true;
            bookResponseData.issuedTo = '';
            bookResponseData.issueDate = '';
            bookResponseData.expectedReturnDate = '';
            bookResponseData.status = 'returned';
        // } if(editedStatus==='issued') {
        //     bookResponseData.available = false;
        //     bookResponseData.status = 'issued';
        } if(editedStatus==='missing'){
            bookResponseData.available = false;
            bookResponseData.status = 'missing';
        }

        // Update the book data with the modified fields
       
            axios.put(`http://localhost:8080/api/book/${bookId}`, bookResponseData)
                .then(response => {
                console.log(response.data);
                // Remove the deleted book from the issuedBookData state if status is changed from issued
                const updatedBookData = issuedBookData.filter(book => book.bookId !== bookId);
                setIssuedBookData(updatedBookData);
                })
                .catch(error => console.error(error));
            
            })
            .catch(error => console.error(error));
          // }
            setEditedStatus('');
        
    
    };
    
    // Update the edited status for a book
  const updateEditedStatus = (bookId, newStatus) => {
    const updatedBookData = issuedBookData.map((book) => {
      if (book.bookId === bookId) {
        return { ...book, status: newStatus };
      }
      return book;
    });
    setIssuedBookData(updatedBookData);
  };

  // Toggle the status options visibility for a book
  const toggleStatusOptions = (bookId) => {
    const updatedBookData = issuedBookData.map((book) => {
      if (book.bookId === bookId) {
        return { ...book, showStatusOptions: !book.showStatusOptions };
      }
      return book;
    });
    setIssuedBookData(updatedBookData);
  };

    

    return(
        <>
      <Navbar/>
      <div className='get-book-container'>
      <div className="search-add-book-container">
        {/* <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search by ID or bookname..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type='submit' className="add-book-button-container">Search</button>
        </div> */}
        <div className="add-book-button-container">
          <button className="add-book-button" onClick={() => {setShowIssueBookModal(true);}}>
            Issue Book
          </button>
        </div>
      </div>
        {error && <p className="error">{error}</p>}
      <div className='table-container'>
     
        <table>
          <thead>
            <tr>
              <th>Book</th>
              <th>Book ID</th>
              <th>User ID</th>
              <th>Issue Date</th>
              <th>Expected Return Date</th>
              {/* <th>Return Date</th> */}
              <th>Status</th>
              <th>Action Buttons</th>
            </tr>
          </thead>
          <tbody>
            {issuedBookData.map((book) => (
              <tr key={book.bookId}>
                <td>{book.title}</td>
                <td>{book.bookId}</td>
                <td>{book.issuedTo}</td>
                <td>{new Date(book.issueDate).toLocaleDateString()}    {new Date(book.issueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </td>
                <td>{new Date(book.expectedReturnDate).toLocaleDateString()}    {new Date(book.expectedReturnDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </td>
                {/* <td>{new Date(book.returnDate).toLocaleDateString()}     {new Date(book.returnDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} */}
                {/* </td> */}
                <td>
                    {book.showStatusOptions ? (

                        <select value={editedStatus} onChange={(e) => {setEditedStatus(e.target.value)}}>
                            <option value="issued" >issued</option>
                            <option value="returned">returned</option>
                            <option value="missing">missing</option>
                        </select>  
                    ) : (
                        book.status
                     ) }
                            
                </td>          
                <td >
                {!book.showStatusOptions ? (
                    <button className='edit-button' onClick={() => toggleStatusOptions(book.bookId)}>Edit</button>
                ) : ( 
                     <button className='edit-button' onClick={() => {toggleStatusOptions(book.bookId); setShowStatusOptions(false); handleSave(book.bookId);} }>Save</button>

                )} 
                  
                  <button className='delete-button' onClick={() => handleDelete(book.bookId)}>Delete</button>
                  {book.available === true && (
                    <button className="delete-button" onClick={() => handleDelete(book.bookId)}>Delete</button>
                 )}                
                </td>
              </tr>
            ))}
          </tbody>
        </table>
     
      </div>
    </div>
    {showIssueBookModal && (
        <IssueBooksModal showIssueBookModal={showIssueBookModal} setShowIssueBookModal={setShowIssueBookModal}/>
    )}
     </>
    );
}
export default IssueBooks;