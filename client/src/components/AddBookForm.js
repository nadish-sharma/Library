import React, { useState } from 'react';
import axios from 'axios';
import bookImg from "../images/books.jpg"
import Navbar from './Navbar';
import "./componentCSS/AddBookFormStyles.css";
import GetBookForm from './GetBookForm';
import { Link } from 'react-router-dom';
import ManualInputAddBookForm from './ManualInputAddBookForm'

function AddBookForm(props) {
  const [showManual, setShowManual] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [changeStyle1, setChangeStyle1] = useState(true);
  const [changeStyle2, setChangeStyle2] = useState(false);
  
  const handleClickManualEntry = () => {
    setShowManual(true);
    setShowSearch(false);
    setChangeStyle1(true);
    setChangeStyle2(false);
  }
  const handleClickSearch = () => {
    setShowSearch(true);
    setShowManual(false);
    setChangeStyle2(true);
    setChangeStyle1(false);
  }

  return (
    <>
      <Navbar />
      <div className="add-book" style={{ 'marginTop': '6rem', 'marginBottom': '3rem'  }}>
        <h2>Add book</h2>
        <div className="add-book-options">
          <button 
          className={changeStyle1 ? 'style-active' : 'style-inactive'}
          onClick={() => handleClickManualEntry()}>
            Manual Input
          </button>
          <button 
          className={changeStyle2 ? 'style-active' : 'style-inactive'}
          onClick={() => handleClickSearch()}>
            Search
          </button>
        </div>

        {showSearch && (
          <GetBookForm/>
        )}
        
        {showManual && (
          <ManualInputAddBookForm/>
        )}
      </div>
      
    </>
  );
}

export default AddBookForm;
