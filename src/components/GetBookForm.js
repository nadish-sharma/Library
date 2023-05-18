import React from "react";
import { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

function GetBookForm() {
    const [search, setSearch] = useState('');
    const [bookData, setBookData] = useState(null);
    const [error, setErrorBook] = useState('');
    let url2='http://localhost:8080/api/book/';

    const handleGetBookLibrary = async () => {
   
        
        {console.log(search);}
        try {
            const response = await axios.get(`${url2}${search}`);
            setBookData(response.data);
          } catch (error) {
            console.error(error);
          }
        // setFilter('');
        console.log(`${url2}${search}`)
        axios.get(`${url2}${search}`)
        // axios.get(`http://localhost:8080/api/book/${search}`)
        .then(response => {
          console.log({search});
          setBookData(response.data);
          console.log(response.data)
          if(response.data==null) {
            console.log("book not in library");
            // setErrorBook("No such User Exists");
            setSearch('');
          }
          else { 
            // setErrorBook(null);
            setSearch('');
          }
        })
        .catch(errorBook => {
            
            if (errorBook.response || error.response.status === 404) {
                setErrorBook("Please enter correct book title");
                // setBookData(null);
                setSearch('');
                console.log(errorBook);
            }
        });
      }

    return(
        <>
    <Navbar />
    <div style={{marginTop: '12em'}}>
      <h2>Get Book by Title</h2>
      <form onSubmit={e => { e.preventDefault(); handleGetBookLibrary(); }}>
        <label>
          Book title:
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
        </label>
        <button type="submit">Get Book</button>
      </form>
{error && <p>{error}</p>}
{!error && bookData && (
  <div>
    <h3>Book Details</h3>
    {bookData.map((book, index) => (
      <div key={index}>
        <p>Book Id: {book.bookId}</p>
        <p>Title: {book.title}</p>
        <p>Author Name: {book.authorName}</p>
        <p>Description: {book.description}</p>
        <p>Availability: {book.available ? 'Yes' : 'No'}</p>
        <hr />
      </div>
    ))}
  </div>
      )}
    </div>
        </>
    );
}
export default GetBookForm;
