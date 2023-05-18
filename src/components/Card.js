import React from 'react';
import './componentCSS/CardStyles.css';
import { useState } from 'react';
import BookDescriptionModal from './BookDescriptionModal';
import bookImg from '../images/books.jpg';

function Card({ bookData, bookDataGoogle, bookDataLibrary, logoClickedStatus, setLogoClickedStatus}) {
  const [show, setShow] = useState(false);
  const [bookItem, setItem] = useState();
  let bookArray;
  let bookDataStructure = [];
  let title;
  let author;
  let id;
  let saleability;
  let thumbnail;
  let amount;
  let currency;


 

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

  // console.log(bookData.isLibraryBook);

  if (bookData != null) {
    if (isLibraryBook === true) {
      bookArray.forEach((book) => {
        bookDataStructure.push({
          amount: book.amount,
          currency: 'CAD',
          title: book.title,
          author: book.authorName,
          id: book.bookId,
          saleability: 'FREE',
          thumbnail: bookImg,
          description: "here there will be description",
          publishedDate: "any date"
        });
      });
    }
  
  else {
    bookArray.forEach((book) => {
      
        title = book.volumeInfo.title;
        author = book.volumeInfo.authors;
        id = book.id;
        saleability = book.saleInfo.saleability;
        thumbnail = book.volumeInfo.imageLinks.thumbnail;
    
  
      if (book.saleInfo && book.saleInfo.listPrice) {
        amount = book.saleInfo.listPrice.amount;
        currency = book.saleInfo.listPrice.currencyCode;
      } else {
        amount = 'FREE'; // or any other value to indicate it's free
        currency = ''; // or any other value if needed
      }
    });
  }
  return (
    <>
  {isLibraryBook
    ? bookDataStructure.map((book) => (
      <div key={book.id} className="card" onClick={() => { setShow(true); setItem(book); }}>
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
    ))

    : bookArray.map((book) => (
      <div key={book.id} className="card" onClick={() => { setShow(true); setItem(book); }}>
        <img src={book.volumeInfo.imageLinks.thumbnail} alt="" />
        <div className="bottom">
          <h5 className="title">{book.volumeInfo.title}</h5>
          <p className="author">{book.volumeInfo.authors}</p>
          {book.saleInfo.saleability === 'FREE' ? (
            <p className="amount">Free</p>
          ) : (
            <p className="amount">
              {book.saleInfo.listPrice.amount} {book.saleInfo.listPrice.currencyCode}
            </p>
          )}
        </div>
      </div>
    ))}
  {console.log(bookItem)}
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
else {
  return(
    <h1>book not found in library</h1>
  )
} 
}

export default Card;
