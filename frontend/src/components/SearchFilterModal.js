import React from "react";
import "./componentCSS/SearchFilterModalStyles.css";
import { SearchFilterItems } from "./SearchFilterItems";
import { useState, useRef } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useEffect } from "react";
import Card from "./Card";
function SearchFiltersModal({url, onUpdateUrl, filter, onUpdateFilter, search ,setInputFocus, setPlaceholderValue, onClose }) {
    // const [url, setUrl] = useState('');
    const [book, setBook] = useState(null);
    const[clickedStatus, setClicked] = useState(false);
   

    const clickHandler = () => {
      setClicked(current=> !current)
  }

  useEffect( () => {
      console.log(clickedStatus);
  }, [clickedStatus]);
    const handleClose = (event) => {
        // Check if the click is on the close button or outside the inner-box div
        if(
          event.target.className === 'modal-overlay'
          ) {
          onClose();
        }
      };

      const handleFilterClick = (event, title) => {
        setPlaceholderValue(title);
        setInputFocus();
        
        if (title === 'library:') {
          onUpdateUrl('http://localhost:8080/api/book/');
          console.log('Success: library');
        } else if (title === 'online:') {
          onUpdateUrl('https://www.googleapis.com/books/v1/volumes?q=');
          onUpdateFilter('&filter=ebooks&maxResults=12');
          console.log('Success: online');
        } else if (title === 'free:') {
          onUpdateUrl('https://www.googleapis.com/books/v1/volumes?q=');
          onUpdateFilter('&filter=free-ebooks&maxResults=12');
          console.log('Success: free');
        } else {
          console.log('No match');
        }
      };

      
  return ( 
  <><div className="modal-overlay" onClick={handleClose}>
      {console.log({ url })}
      <div className="modal-filter">
        <div className="modal-header">
          <h3>Search Filters</h3>
        </div>
        <div className="modal-body">
          <ul className="modal-body-list">
            {SearchFilterItems.map((item, index) => {
              return (
                <li
                key={index}
                className="search-list-body"
                onClick={(event) => handleFilterClick(event, item.title)}
                >
                  {/* <Link className={item.cName} to={item.url}> */}
                  <button className={!clickedStatus ? "search-links" : "search-links-clicked"} onClick={ handleFilterClick}>{item.title}</button><span>{item.description}</span>
                  {/* </Link> */}
                </li>);
            })}

          </ul>
        </div>
       { console.log("inside modal-overlay "+url)}
        {/* <Navbar url={url}/> */}
      </div>
      { console.log("outside modal-overlay "+url)}
      {/* <Navbar url={url}/> */}
    </div>
    <div>
      
        {book != null &&
          <div className="container">
            <Card bookData={book} />
          </div>}
      </div></>
    
   
  );
}

export default SearchFiltersModal;
