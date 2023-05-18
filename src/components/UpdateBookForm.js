import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import bookImg from "../images/books.jpg";
import "./componentCSS/UpdateBookFormStyles.css";

function UpdateBookForm() {
  const [bookId, setBookId] = useState('');
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [description, setDescription] = useState('');
  const [publication, setPublication] = useState('');
  const [isbn, setIsbn] = useState('');
  const [showUpdatedBook, setShowUpdatedBook] = useState(false);
  const [publishedDate, setPublishedDate] = useState('');
  const [isAvailable, setIsAvailable] = useState('');
  const [isLibraryBook, setIsLibraryBook] = useState('');
  const [amount, setAmount] = useState('FREE');
  const [thumbnail,setThumbnail] = useState(bookImg);
  const [bookCount, setBookCount] = useState(0);
  const [totalBookCount, setTotalBookCount] = useState(0);

  const [error, setError] = useState(null);

  

  const handleUpdateBook = () => {
    axios.put(`http://localhost:8080/api/book/${bookId}`, {
      bookId: bookId,
      title: title,
      authorName: authorName,
      description: description,
      publication: publication,
      publishedDate: publishedDate,
      isbn: isbn,
      isAvailable: isAvailable,
      isLibraryBook: isLibraryBook,
      amount: "FREE",
      bookCount: bookCount,
      thumbnail: bookImg
    })
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
    setShowUpdatedBook(true);
  }

  return (
    <>
    <Navbar />
    <div style={{ marginTop: '12em' , alignContent:'center' }}>
      <h2>Update book</h2>
      <form className='update-book-form' onSubmit={e => { e.preventDefault(); handleUpdateBook(); }}>
        <label>
          Book Id:
          <input type="text" value={bookId} onChange={e => setBookId(e.target.value)} />
        </label>
        <label>
          Title:
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </label>
        <label>
          Author Name:
          <input type="text" value={authorName} onChange={e => setAuthorName(e.target.value)} />
        </label>
        <label>
          ISBN:
          <input type="text" value={isbn} onChange={e => setIsbn(e.target.value)} />
        </label>
        <label>
          Publication:
          <input type="text" value={publication} onChange={e => setPublication(e.target.value)} />
        </label>
        <label>
          Published Date:
          <input type="text" value={publishedDate} onChange={e => setPublishedDate(e.target.value)} />
        </label>
        <label>
          Description:
          <input type="text" style={{ "width": "10em", "height": "10em" }} value={description} onChange={e => setDescription(e.target.value)} />
        </label>
        <label>
          Library Book:
          <input type="checkbox" checked={isLibraryBook} onChange={e => setIsLibraryBook(e.target.checked)} />
        </label>
        <label>
          Availability:
          <input type="checkbox" checked={isAvailable} onChange={e => setIsAvailable(e.target.checked)} />
        </label>
        <button type="submit" >Update Book</button>
      </form>
      {/* {error && <p>{error}</p>} */}
      {showUpdatedBook && 
        <div>
          <h3>book Details</h3>
          <p>book Id: {bookId}</p>
          <p>title: {title}</p>
          <p>author name: {authorName}</p>
          <p>description: {description}</p>
          <p>availability: {isAvailable ? 'Yes' : 'No'}</p>
      </div>
      }
        
      {/* )} */}
    </div></>
  );
}

export default UpdateBookForm;
