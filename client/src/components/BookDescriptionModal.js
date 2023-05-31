import React, { useState } from 'react';
import './componentCSS/BookDescriptionModal.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BookViewer from '../routes/BookViewer';
import Home from '../routes/Home';
import Navbar from './Navbar';

const BookDescriptionModal = ({ bookData, isLibraryBook, show, showEditModal, book, onClose }) => {
  const [showViewer, setShowViewer] = useState(false);
  const [error, setError] = useState(null);

  let title;
  let authorName;
  let publication;
  let publishedDate;
  let description;
  let id;
  let isAvailable;
  let isLibrary;
  let saleability;
  let thumbnail;
  let buy;
  let preview;
  let amount;
  let currency;

  const setBook = (bookStuff) => {
    book = bookStuff;
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
  

    thumbnail = book.thumbnail;
    title = book.title;
    authorName = book.authorName || [];
    publication = book.publication;
    publishedDate = book.publishedDate;
    description = book.description;
    saleability = book.saleability;
    id = book.id;
    isAvailable = book.isAvailable;
    isLibrary = book.isLibrary;
    if(book.amount!= null && book.currency!=null) {
      amount = book.amount;
      currency = book.currency;
    }
    if(book.buy!=null && book.preview!=null) {
      buy = book.buy;
      preview = book.preview;
    }
 
  const openViewer = (event) => {
    handleClose(event);
    setShowViewer(true);
  };

  const handleAddBook =(event) => {
      // setBookCount(bookCount + 1);
      event.preventDefault();
      axios.post(`http://localhost:8080/api/book`, {
        id: book.id,
        bookId: book.id,
        title: book.title,
        authorName: book.authorName || [],
        description: book.description,
        publication: book.publication,
        publishedDate: book.publishedDate,
        // isbn: book.isbn,
        isAvailable: book.isAvailable,
        isLibraryBook: book.isLibraryBook,
        amount: book.amount,
        currency: book.currency,
        saleability: book.saleability,
        // bookCount: bookCount,
        thumbnail: book.thumbnail
      })
      .then(response => {
        console.log(response.data)
        setBook(response.data);
      })
      .catch(error => {
        console.error(error);
        setError("book not added!");
      });
  
      // setTotalBookCount(totalBookCount + 1);
    };

  return (
    <>
      <div className="overlay" onClick={handleClose}>
        <div className="overlay-inner">
          <button className="close" onClick={onClose}><i className="fas fa-times"></i></button>
          <div className="inner-box">
            <img src={thumbnail} alt="" />
            <div className="info">
              <p className="title">{title}</p>
              <p className="author">{Array.isArray(authorName) ? authorName.join(', ') : authorName}</p>
              <p className="publisher">{publication}</p>
              <p className='publishedDate'>{publishedDate}</p><br />
              <div className='button-modal'>
                {saleability === "FREE" ? (
                  <>
                    <button className="read-button" onClick={openViewer}>Read</button>
                    <button className="read-button" onClick={handleAddBook}>Add Book</button>
                    {console.log(showViewer)}
                    {console.log("read pressed")}
                  </>
                ) : (
                  <>
                    <button onClick={openViewer}>Preview</button>
                    <a href={book.buy}><button>Buy</button></a>
                    <button className="read-button" onClick={handleAddBook}>Add Book</button>
                  </>
                )}
              </div>
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
};

export default BookDescriptionModal;
