import React from 'react'
import bookImage from '../images/book.jpg'
import "./CardStyles.css";
import { Link } from "react-router-dom";

function Card({ book }) {
    console.log(book)
    return (
        <>
          {book.map((book) => (
        
            <div className="card">
            <a href={book.saleInfo.buyLink} >
            {/* <Link to="/bookdescription"> */}
              <img src={book.volumeInfo.imageLinks.thumbnail} alt=""/>
              <div className="bottom">
                <h5 className="title">{book.volumeInfo.title}</h5>
                <p className="author">{book.volumeInfo.authors}</p>
                {book.saleInfo.saleability === "FREE" ? (
                    <p className="amount">Free</p>
                  ) : (
                    <p className="amount">{book.saleInfo.retailPrice.amount} {book.saleInfo.listPrice.currencyCode}</p>
                  )}
                {/* <div className="bottom-buttons">
                    <button className="card-read-button" type="submit">Read</button>
                    <button className="card-buy-button" type="submit">Buy</button>
                </div> */}
                {/* <a href={book.selfLink}><p>{book.selfLink}</p> </a> */}
              </div>
              {/* </Link> */}
              </a>
            </div>
        
          ))}
        </>
      )
  }
  
  export default Card;
  