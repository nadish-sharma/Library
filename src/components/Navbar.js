import "./NavbarStyles.css";
import { MenuItems } from "./MenuItems";
import axios from "axios";
import React, {useState} from "react";
import { Link } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import Card from "./Card";
// import AppContext from './AppContext';
// import { useContext } from 'react';
function Navbar () {
    
    //We made use of useEffect hook to get updated state value//
    //https://stackoverflow.com/questions/61054275/usestate-with-boolean-value-in-react//
    const {useEffect, useState } = React;
    const [clickedStatus, setClicked] = useState(false); //variable clickedStatus is initially set to False
    //onClick turns false value to true(made use in tertiary if-else statement to show something different on clicking)
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');
    const [bookData, setBookData] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get(`https://www.googleapis.com/books/v1/volumes?q='+${search}`+'&filter=ebooks')
        // axios.get(`https://www.googleapis.com/books/v1/volumes?q='+${search}`)
        .then(response => {
            //console.log({search});
            setBookData(response.data.items)
            console.log(response.data.items)
            if(response.data==null) {
              console.log("No such book found");
              setError("No such Book Exists");
              setSearch('');
            }
            else { 
              setError(null);
              setSearch('');
            }
          })
          .catch(error => {
              
              if (error.response && error.response.status === 200) {
                  setError("Unknown error");
                  setSearch(null);
                  console.log(error);
              }
          });      // Call your search function with the search query as input
    }
    // const [loginStatus, setLogin] = useState(false);
    const clickHandler = () => {
        setClicked(current=> !current)
    }

    useEffect( () => {
        console.log(clickedStatus);
    }, [clickedStatus]);
    return (
        <>
        <div className="master">   
            <nav className="NavbarItems">
                               
                <Link to="/">
                    <h2 className="navbar-logo">
                        Library
                    </h2>
                </Link>
                    
                <div className="menu-icons" onClick={clickHandler}>
                    <i className={clickedStatus ? "fas fa-times" : "fas fa-bars"} ></i>
                </div>

                <form className="search" onSubmit={handleSubmit}>
                    <button type="submit"><i className="fas fa-search"></i></button>
                    <input type="text" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} />
                </form>

                <ul className={clickedStatus ? "navbar-menu active" : "navbar-menu" }>
                        {MenuItems.map((item, index) => {
                        return (
                        <li key={index}>
                            <Link className={item.cName} to={item.url}>
                                <i className={item.icon}></i>{item.title}
                            </Link>
                        </li>
                    );
                })}
                    <Link to="/login"><button className="navbar-links-mobile">Sign In</button></Link>
                </ul>
        </nav>
        <a href={bookData.selfLink}>
       
            <div className="container">
                <Card book={bookData}/>
            </div>
       
        </a>
    </div> 
    </>

    );
}

export default Navbar;