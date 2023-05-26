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
  const [isAvailable, setIsAvailable] = useState('');
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
    setIsLibraryBook(bookItem.isLibraryBook);
    setIsAvailable(bookItem.isAvailable);
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

  console.log({ID})
  const handleUpdateBook = () => {
    console.log({ID})
      if(bookItem.thumbnail==null) {
        setThumbnail(bookImg);
      } else{
        setThumbnail(bookItem.thumbnail);
      }
    axios.put(`http://localhost:8080/api/book/${ID}`, {
      bookId: bookId,
      title: title,
      authorName: authorName,
      description: description,
      publication: publication,
      publishedDate: publishedDate,
      isbn: isbn,
      isAvailable: isAvailable,
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

    {!showEditModal &&  <Navbar />} 

    {showEditModal && 
    <div className="overlay-edit-book" onClick={handleClose}>
        <div className="overlay-inner">
          <button className="close-book" ><i className="fas fa-times"></i></button>
          <div className="inner-box">
            <img src={thumbnail} alt="" />
            <div className="info">
            <h1>Edit book with ID: `{ID}`</h1>
            <h2>Update book</h2>
      <form className='update-book-form' onSubmit={e => { e.preventDefault(); handleUpdateBook(); }}>
        <label>
          Book Id:
          <input type="text"  value={bookId} onChange={e => setBookId(e.target.value)} />
        </label>
        <label>
          Title:
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </label>
        <label>
          Author Name:
          <input type="text"  value={authorName} onChange={e => setAuthorName(e.target.value)} />
        </label>
        <label>
          ISBN:
          <input type="text"  value={isbn} onChange={e => setIsbn(e.target.value)} />
        </label>
        <label>
          Publication:
          <input type="text"  value={publication} onChange={e => setPublication(e.target.value)} />
        </label>
        <label>
          Published Date:
          <input type="text"  value={publishedDate} onChange={e => setPublishedDate(e.target.value)} />
        </label>
        <label>
          Description:
          <input type="text" style={{ "width": "10em", "height": "10em" }}  value= {description} onChange={e => setDescription(e.target.value)} />
        </label>
        <label>
          Price:
          <input type="text"  value={amount} onChange={e => setAmount(e.target.value)} />
        </label>
        <label>
          Currency:
          <input type="text"  value={currency} onChange={e => setCurrency(e.target.value)} />
        </label>
        <label>
          Library Book:
          <input type="checkbox" checked={bookItem.isLibraryBook} onChange={e => setIsLibraryBook(e.target.checked)} />
        </label>
        <label>
          Availability:
          <input type="checkbox" checked={bookItem.isAvailable} onChange={e => setIsAvailable(e.target.checked)} />
        </label>
        {/* <label>
          Thumbnail:
          <input type="file" accept="image/*" onChange={handleThumbnailChange} />
        </label> */}
        <button type="submit" >Update Book</button>
      </form>
            </div>
          </div>
          <h4 className="description">{description}</h4>
        </div>
      </div>
}


   
    {/* <div style={{ marginTop: '12em' , alignContent:'center' }}>
      <h1>Edit book with ID: `{ID}`</h1>
      <h2>Update book</h2>
      <form className='update-book-form' onSubmit={e => { e.preventDefault(); handleUpdateBook(); }}>
        <label>
          Book Id:
          <input type="text"  value={bookId} onChange={e => setBookId(e.target.value)} />
        </label>
        <label>
          Title:
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </label>
        <label>
          Author Name:
          <input type="text"  value={authorName} onChange={e => setAuthorName(e.target.value)} />
        </label>
        <label>
          ISBN:
          <input type="text"  value={isbn} onChange={e => setIsbn(e.target.value)} />
        </label>
        <label>
          Publication:
          <input type="text"  value={publication} onChange={e => setPublication(e.target.value)} />
        </label>
        <label>
          Published Date:
          <input type="text"  value={publishedDate} onChange={e => setPublishedDate(e.target.value)} />
        </label>
        <label>
          Description:
          <input type="text" style={{ "width": "10em", "height": "10em" }}  value= {description} onChange={e => setDescription(e.target.value)} />
        </label>
        <label>
          Library Book:
          <input type="checkbox" checked={bookItem.isLibraryBook} onChange={e => setIsLibraryBook(e.target.checked)} />
        </label>
        <label>
          Availability:
          <input type="checkbox" checked={bookItem.isAvailable} onChange={e => setIsAvailable(e.target.checked)} />
        </label>
        <label>
          Thumbnail:
          <input type="file" accept="image/*" onChange={handleThumbnailChange} />
        </label>
        <button type="submit" >Update Book</button>
      </form> */}
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
    
    </>
);
}

export default UpdateBookForm;
