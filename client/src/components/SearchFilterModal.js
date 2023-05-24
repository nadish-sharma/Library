import React from "react";
import "./componentCSS/SearchFilterModalStyles.css";
import { SearchFilterItems } from "./SearchFilterItems";
import { useState, useRef } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useEffect } from "react";
import Card from "./Card";
function SearchFiltersModal({url, onUpdateFilterNumber, onUpdateUrl, onUpdateUrl2, onUpdateFilter, onUpdateFilter2 ,setInputFocus, setPlaceholderValue, onClose }) {
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

      const handleFilterClick = (event, title, urlStart1, urlStart2, filterLink1, filterLink2, filterNumber) => {
        setPlaceholderValue(title);
        setInputFocus();
        
        if (title) {
          onUpdateUrl(urlStart1);
          onUpdateUrl2(urlStart2)
          onUpdateFilter(filterLink1);
          onUpdateFilter2(filterLink2);
          onUpdateFilterNumber(filterNumber);
          console.log(`Success: ${title}`);
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
                onClick={(event) => handleFilterClick(event, item.title, item.urlStart1, item.urlStart2, item.filterLink1, item.filterLink2, item.filterNumber)}
                >
                  <button className={!clickedStatus ? "search-links" : "search-links-clicked"} 
                  onClick={(event) => handleFilterClick(event, item.title, item.urlStart1, item.urlStart2, item.filterLink1, item.filterNumber)}
                  >
                    {item.title}
                  </button>

                  <span>
                    {item.description}
                  </span>
  
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
      
        {(book != null) &&
          <div className="container">
            <Card bookData={book} />
          </div>}
      </div></>
    
   
  );
}

export default SearchFiltersModal;
