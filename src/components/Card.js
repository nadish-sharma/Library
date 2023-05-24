import React from 'react';
import './componentCSS/CardStyles.css';
import { useState } from 'react';
import BookDescriptionModal from './BookDescriptionModal';
import bookImg from '../images/books.jpg';
import UpdateBookForm from './UpdateBookForm';

function Card({ bookData, bookDataGoogle, bookDataLibrary, logoClickedStatus, setLogoClickedStatus }) {
  const [show, setShow] = useState(false);
  const [bookItem, setItem] = useState();
  const [loading, setLoading] = useState(true); // Add loading state
  const [isHovered, setIsHovered] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditModal = () => {
    setShowEditModal(true);
    setShow(false);
    console.log({show});
  }
  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  let bookArray;
  let bookDataStructure = [];
  let title;
  let author;
  let id;
  let saleability;
  let thumbnail;
  let amount;
  let currency;
  let description;
  let publisher;
  let publishedDate;

  //// USE SETDESCRIPTION TYPE METHODS IN THE .then AND SET THEM TO NULL OTHERWISE THE VALUES CARRY FORWARD THE NEXT TIME//

  if (!Array.isArray(bookData)) {
    bookArray = [bookData];
  } else {
    bookArray = bookData;
  }
  console.log("bookArray:", bookArray);
  const book0 = bookArray && bookArray.length > 0 ? bookArray[0] : null;
  console.log("book0:", book0);
  const isLibraryBook = book0 && book0.libraryBook ? book0.libraryBook : false;
  console.log("isLibraryBook:", isLibraryBook);

  
  if (bookData != null) {
    bookArray.forEach((book) => {
      if(book.thumbnail!=null) {
        thumbnail = book.thumbnail;
      }
      else {
        thumbnail = bookImg;
      }
      if(book.description!=null) {
        description = book.description;
      } else{
        description = '';
      }
      if(book.publishedDate!=null) {
        publishedDate = book.publishedDate;
      } else{
        publishedDate = null;
      }
      if(book.publisher!=null) {
        publisher = book.publisher;
      } else{
        publishedDate = null;
      }
      if (book && book.libraryBook) {
        bookDataStructure.push({
          amount: book.amount,
          currency: 'CAD',
          title: book.title,
          author: book.authorName,
          id: book.bookId,
          saleability: 'FREE',
          thumbnail: thumbnail,
          description: description,
          publishedDate: publishedDate,
          publisher : publisher
        });
      } else {
        if (book.saleInfo && book.saleInfo.listPrice) {
          amount = book.saleInfo.listPrice.amount;
          currency = book.saleInfo.listPrice.currencyCode;
        } else {
          amount = 'FREE';
          currency = '';
        }
        bookDataStructure.push({
          title: book.volumeInfo.title,
          author: book.volumeInfo.authors,
          id: book.id,
          saleability: book.saleInfo.saleability,
          thumbnail: book.volumeInfo.imageLinks.thumbnail,
          description: book.volumeInfo.description,
          publisher: book.volumeInfo.publisher,
          publishedDate: book.volumeInfo.publishedDate,
          amount: amount,
          currency: currency,
          book : book,
          preview : book.volumeInfo.previewLink,
          buy : book.saleInfo.buyLink
       
        });
      }
    });
  
 if (bookDataStructure.length > 0) {
    return (
      <>
        {bookDataStructure.map((book) => (
          
          <div  key={book.id} 
                className="card" 
                onClick={() => { setShow(true); setItem(book); }}
                onMouseEnter={handleHover}
                onMouseLeave={handleMouseLeave}
          >
            {isHovered && 
            
            <i className="fa-solid fa-pen"   
               onClick={() => handleEditModal()}>
            </i>
          }
            
            <img src={book.thumbnail} alt="" />
            <div className="bottom">
              <h5 className="title">{book.title}</h5>
              <p className="author">{book.author}</p>
              {book.saleability === 'FREE' ? (
                <p className="amount">Free</p>
              ) : (
                <p className="amount">
                  {book.amount} {book.currency}
                </p>
              )}
            </div>
          </div>
         

        ))}
        {console.log({bookItem})}
        {showEditModal && <UpdateBookForm />}
        <BookDescriptionModal
          bookData={bookData} isLibraryBook={isLibraryBook}
          show={show} book={bookItem}
          logoClickedStatus={logoClickedStatus}
          setLogoClickedStatus={setLogoClickedStatus}
          onClose={() => setShow(false)}
        />
      </>
    );
  }
 } else {
    return (
      <h1>Book not found anywhere</h1>
    );
  }
}

export default Card;
