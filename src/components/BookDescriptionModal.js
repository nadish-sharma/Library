import React, { useState } from 'react';
import './componentCSS/BookDescriptionModal.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BookViewer from '../routes/BookViewer';
import Home from '../routes/Home';
import Navbar from './Navbar';

const BookDescriptionModal = ({ bookData, isLibraryBook, show, book, onClose }) => {
  const [showViewer, setShowViewer] = useState(false);
  const [error, setError] = useState(null);

  let title;
  let author;
  let publisher;
  let publishedDate;
  let description;
  let id;
  let saleability;
  let thumbnail;
  let buy;
  let preview;
  // let amount;
  // let currency;

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
  // if(isLibraryBook) {
    thumbnail = book.thumbnail;
    title = book.title;
    author = book.author;
    publisher = book.publisher;
    publishedDate = book.publishedDate;
    description = book.description;
    saleability = book.saleability;
    id = book.id;
    if(book.buy!=null && book.preview!=null) {
      buy = book.buy;
      preview = book.preview;
    }
  // } else{
    // thumbnail = book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail;
    // title = book.volumeInfo.title;
    // author = book.volumeInfo.authors;
    // publisher = book.volumeInfo.publisher;
    // publishedDate = book.volumeInfo.publishedDate;
    // description = book.volumeInfo.description;
    // saleability = book.saleInfo.saleability;
  // }

  // let thumbnail = book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail;
  // const title = book.volumeInfo.title;
  // const author = book.volumeInfo.authors;
  // const publisher = book.volumeInfo.publisher;
  // const publishedDate = book.volumeInfo.publishedDate;
  // const description = book.volumeInfo.description;
  // const saleability = book.saleInfo.saleability;

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
        authorName: book.authorName,
        description: book.description,
        publication: book.publication,
        publishedDate: book.publishedDate,
        isbn: book.isbn,
        isAvailable: book.isAvailable,
        isLibraryBook: book.isLibraryBook,
        amount: book.amount,
        // bookCount: bookCount,
        thumbnail: book.thumbnail
      })
      .then(response => {
        console.log(response.data)
        setBook(response.data);
  //       setBookId('');
  //       setTitle('');
  //       setAuthorName('');
  //       setDescription('');
  //       setPublication('');
  //       setPublishedDate('');
  //       setIsbn('');
  //       setIsAvailable(false);
  //       setIsLibraryBook(false);
  //       setAmount('');
  //       setThumbnail(thumbnail);
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
              <p className="author">{author}</p>
              <p className="publisher">{publisher}<span>{publishedDate}</span></p><br />
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
                    <a href={book.preview}><button>Preview</button></a>
                    <a href={book.buy}><button>Buy</button></a>
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
