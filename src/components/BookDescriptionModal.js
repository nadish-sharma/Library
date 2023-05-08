import React, { useState } from 'react';
import './BookDescriptionModal.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BookViewer from '../routes/BookViewer';

const BookDescriptionModal = ({ show, book, onClose }) => {
  const [showViewer, setShowViewer] = useState(false);

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

  let thumbnail = book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail;
  const title = book.volumeInfo.title;
  const author = book.volumeInfo.authors;
  const publisher = book.volumeInfo.publisher;
  const publishedDate = book.volumeInfo.publishedDate;
  const description = book.volumeInfo.description;
  const saleability = book.saleInfo.saleability;

  const openViewer = (event) => {
    handleClose(event);
    setShowViewer(true);
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
                    {console.log(showViewer)}
                    {console.log("read pressed")}
                  </>
                ) : (
                  <>
                    <a href={book.volumeInfo.previewLink}><button>Preview</button></a>
                    <a href={book.saleInfo.buyLink}><button>Buy</button></a>
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
                          <BookViewer id={book.id} show={showViewer} />
                      </div>

      )}
    </>
  );
};

export default BookDescriptionModal;
