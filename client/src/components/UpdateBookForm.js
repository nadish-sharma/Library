import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import bookImg from "../images/books.jpg";
import "./componentCSS/UpdateBookFormStyles.css";
import { useEffect } from 'react';

function UpdateBookForm({bookItem,ID, showEditModal,setShowEditModal}) {
  const [bookId, setBookId] = useState('');
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState([]);
  const [description, setDescription] = useState('');
  const [publication, setPublication] = useState('');
  const [isbn, setIsbn] = useState('');
  const [showUpdatedBook, setShowUpdatedBook] = useState(false);
  const [publishedDate, setPublishedDate] = useState('');
  const [available, setAvailable] = useState('');
  const [isLibraryBook, setIsLibraryBook] = useState('');
  const [amount, setAmount] = useState('FREE');
  const [currency, setCurrency] = useState('');
  const [thumbnail,setThumbnail] = useState(null);
  const [bookCount, setBookCount] = useState(0);
  const [totalBookCount, setTotalBookCount] = useState(0);
  const [show, setShow] = useState(false);

  const [error, setError] = useState(null);


  // Set initial form field values when the component mounts
  useEffect(() => {
    setBookId(bookItem.bookId);
    setTitle(bookItem.title);
    setAuthorName(bookItem.authorName);
    setIsbn(bookItem.isbn);
    setPublication(bookItem.publication);
    setPublishedDate(bookItem.publishedDate);
    setDescription(bookItem.description);
    setAmount(bookItem.amount);
    setCurrency(bookItem.currency);
    setIsLibraryBook(bookItem.isLibraryBook);
    setAvailable(bookItem.available);
    setThumbnail(bookItem.thumbnail);
  }, [bookItem]);
  
  const handleClose = (event) => {
    // Check if the click is on the close button or outside the inner-box div
    if (
      event.target.className === 'overlay-edit-book' ||
      event.target.className === 'close-book'    
    ) {
      setShowEditModal(false);
    }
  };
  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    setThumbnail(file);
  };

 
  const handleUpdateBook = () => {
    console.log({bookId})
      if(bookItem.thumbnail==null) {
        setThumbnail(bookImg);
      } else{
        setThumbnail(bookItem.thumbnail);
      }
    axios.put(`http://localhost:8080/api/book/${bookId}`, {
      bookId: bookId,
      title: title,
      authorName: authorName,
      description: description,
      publication: publication,
      publishedDate: publishedDate,
      isbn: isbn,
      amount: amount,
      currency: currency,
      available: available,
      isLibraryBook: isLibraryBook,
      amount: amount,
      currency: currency,
      // bookCount: bookCount,
      thumbnail: bookImg
    })
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
    setShowUpdatedBook(true);
  }

  return (
    <>

    {!showEditModal &&  <Navbar/>} 

    {showEditModal && 
    <div className="overlay-edit-book" onClick={handleClose}>
        <div className="overlay-inner">
          <button className="close-book" ><i className="fas fa-times"></i></button>
          <div className="inner-box">
            <img src={thumbnail} alt="" />
            <div className="info">
            <h1>Edit book</h1>
      <form className='update-book-form' onSubmit={e => { e.preventDefault(); handleUpdateBook(); }}>
        <label>
          <span>Book Id:</span>
          <input type="text"  value={bookId} onChange={e => setBookId(e.target.value)} />
        </label>
        <label>
          <span>Title:</span>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </label>
        <label>
          <span>Author Name:</span>
          <input type="text"  value={authorName} onChange={e => setAuthorName(e.target.value)} />
        </label>
        <label>
          <span>ISBN:</span>
          <input type="text"  value={isbn} onChange={e => setIsbn(e.target.value)} />
        </label>
        <label>
          <span>Publication:</span>
          <input type="text"  value={publication} onChange={e => setPublication(e.target.value)} />
        </label>
        <label>
          <span>Published Date:</span>
          <input type="text"  value={publishedDate} onChange={e => setPublishedDate(e.target.value)} />
        </label>
        <label>
          <span>Description:</span>
          <textarea type="text" style={{ "height": "10rem" }}  value= {description} onChange={e => setDescription(e.target.value)} />
        </label>
        <label>
          <span>Price:</span>
          <input type="text"  value={amount} onChange={e => setAmount(e.target.value)} />
        </label>
        <label>
          <span>Currency:</span>
          <input type="text"  value={currency} onChange={e => setCurrency(e.target.value)} />
        </label>
        <label>
          <span>Library Book:</span>
          <input type="checkbox" checked={bookItem.isLibraryBook} onChange={e => setIsLibraryBook(e.target.checked)} />
        </label>
        <label>
          <span>Availability:</span>
          <input type="checkbox" checked={bookItem.available} onChange={e => setAvailable(e.target.checked)} />
        </label>
        {/* <label>
          Thumbnail:
          <input type="file" accept="image/*" onChange={handleThumbnailChange} />
        </label> */}
        <button type="submit">Update Book</button>
      </form>
            </div>
          </div>
          <h4 className="description">{description}</h4>
        </div>
      </div>
}

      {showUpdatedBook && 
        <div>
          <h3>book Details</h3>
          <p>book Id: {bookId}</p>
          <p>title: {title}</p>
          <p>author name: {authorName}</p>
          <p>description: {description}</p>
          <p>availability: {available ? 'Yes' : 'No'}</p>
      </div>
      }
        
      {/* )} */}
    
    </>
);
}

export default UpdateBookForm;
