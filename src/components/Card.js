import React from 'react';
import './componentCSS/CardStyles.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import BookDescriptionModal from './BookDescriptionModal';

function Card({ bookData }) {
  const [show, setShow] = useState(false);
  const [bookItem, setItem] = useState();
  let bookArray;
  let bookDataStructure = [];

  if (!Array.isArray(bookData)) {
    bookArray = [bookData];
  } else {
    bookArray = bookData;
  }

  console.log(bookData.isLibraryBook);


  if (bookData.libraryBook === true) {
    bookDataStructure.push({
      amount: bookData.amount,
      currency: 'CAD',
      title: bookData.title,
      author: bookData.authorName,
      id: bookData.bookId,
      saleability: 'FREE',
      img: null
    });
  } else {
    bookArray.forEach((book) => {
      bookDataStructure.push({
        amount: book.saleInfo.listPrice.amount,
        currency: book.saleInfo.listPrice.currencyCode,
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors,
        id: book.id,
        saleability: book.saleInfo.saleability,
        img: book.volumeInfo.imageLinks.thumbnail
      });
    });
  }

  return (
    <>
      {console.log(bookArray)}
      {bookDataStructure.map((book) => (
        <div key={book.id} className="card" onClick={() => { setShow(true); setItem(book); }}>
          <img src={book.img} alt="" />
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
      <BookDescriptionModal show={show} book={bookItem} onClose={() => setShow(false)} />
    </>
  );
}

export default Card;
