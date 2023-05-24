import React from "react";
import { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Card from "./Card";
import "./componentCSS/GetBookFormStyles.css";
function GetBookForm() {
    const [search, setSearch] = useState('');
    const [bookData, setBookData] = useState(null);
    const [error, setError] = useState('');
    let url2='http://localhost:8080/api/book/';
    let url='https://www.googleapis.com/books/v1/volumes?q=';

    const handleGetFreeBooksFromEverywhere = async () => {
      // const urlGoogle = `${url}${search}${filter}`; &filter=free-ebooks&maxResults=12
      const urlGoogle = `${url}${search}&filter=free-ebooks&maxResults=16`;
      const urlLibrary = `${url2}${search}`;
    
      try {
        let responseData1 = [];
        let responseData2 = [];
    
        try {
          const response1 = await axios.get(urlGoogle);
          if (response1.status === 200) {
            responseData1 = response1.data && response1.data.items ? response1.data.items : [];
          } else {
            console.error('Error from source 1:', response1.status);
          }
        } catch (error1) {
          console.error('Error from source 1:', error1);
        }
    
        try {
          const response2 = await axios.get(urlLibrary);
          if (response2.status === 200) {
            responseData2 = response2.data || [];
          } else {
            console.error('Error from source 2:', response2.status);
          }
        } catch (error2) {
          console.error('Error from source 2:', error2);
        }
    
        setBookData([...responseData2, ...responseData1]);
        // setShowFilters(false);
        setSearch('');
    
        if (responseData1.length === 0 && responseData2.length === 0) {
          console.log("No such book found");
          setError("No such Book Exists");
        } else {
          setError(null);
        }
      } catch (error) {
        // Error handling
        console.error('Unknown error:', error);
        setError("Unknown error");
        setSearch(null);
      }
    }
  
    return(
        <>
    {/* <Navbar /> */}
    <div className="get-book-form-platform" style={{marginTop: '0.5rem'}}>
      <h4>Search book by title</h4>
      <form className ="get-book-form-body" onSubmit={e => { e.preventDefault(); handleGetFreeBooksFromEverywhere(); }}>
        <label>
          {/* Book title: */}
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
        </label>
        <button type="submit">Get Book</button>
      </form>
{error && <p>{error}</p>}
{!error && bookData && (
  <div>
    <h1>Results</h1>
    {/* <h3>Book Details</h3> */}
    <div className="container-card">
      <Card bookData = {bookData}/>
    </div>
    
    {/* {bookData.map((book, index) => (
      <div key={index}>
        <p>Book Id: {book.bookId}</p>
        <p>Title: {book.title}</p>
        <p>Author Name: {book.authorName}</p>
        <p>Description: {book.description}</p>
        <p>Availability: {book.available ? 'Yes' : 'No'}</p>
        <hr />
      </div>
    ))} */}
  </div>
      )}
    </div>
        </>
    );
}
export default GetBookForm;
