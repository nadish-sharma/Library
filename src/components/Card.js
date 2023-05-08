import React from 'react'
import "./CardStyles.css";
import { Link } from "react-router-dom";
import { useState } from 'react';
import BookDescriptionModal from './BookDescriptionModal';

function Card({ bookData }) {
    const [show,setShow]=useState(false);
    const [bookItem,setItem]=useState();
    // const [priceStatus, setPriceStatus]=useState("FREE");
    return (
        <>
          {console.log(bookData)}
          {bookData.map((book) => (
            
            <><div key={book.id} className="card" onClick={()=>{setShow(true); setItem(book); }}>
              {/* <a href={book.saleInfo.buyLink}> */}
                {/* <Link to={{ pathname: '/bookdescription', state: { bookData: book } }}> */}
                <img src={book.volumeInfo.imageLinks.thumbnail} alt="" />
                <div className="bottom">
                  <h5 className="title">{book.volumeInfo.title}</h5>
                  <p className="author">{book.volumeInfo.authors}</p>
                  {book.saleInfo.saleability === "FREE" ? (
                    <p className="amount">Free</p>
                  ) : (
                    <p className="amount">{book.saleInfo.listPrice.amount} {book.saleInfo.listPrice.currencyCode}</p>
                  )}
                  {/* <div className="bottom-buttons">
        <button className="card-read-button" type="submit">Read</button>
        <button className="card-buy-button" type="submit">Buy</button>
    </div> */}
                  {/* <a href={book.selfLink}><p>{book.selfLink}</p> </a> */}
                </div>
                {/* </Link> */}
                {/* fdf */}
                {/* </Link> */}
              {/* </a> */}
            </div>
            </>
          ))}
          <BookDescriptionModal show={show} book={bookItem} onClose={()=>setShow(false) } />
        </>
      )
  }
  
  
  export default Card;
  