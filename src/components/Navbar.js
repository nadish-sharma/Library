import "./componentCSS/NavbarStyles.css";
import { MenuItems } from "./MenuItems";
import axios from "axios";
import React, {useState} from "react";
import { Link } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import Card from "./Card";
import SearchFiltersModal from "./SearchFilterModal";
function Navbar () {
    
    //We made use of useEffect hook to get updated state value//
    //https://stackoverflow.com/questions/61054275/usestate-with-boolean-value-in-react//
    const {useEffect, useState } = React;
    const [clickedStatus, setClicked] = useState(false); //variable clickedStatus is initially set to False
    //onClick turns false value to true(made use in tertiary if-else statement to show something different on clicking)
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');
    const [bookData, setBookData] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [book, setBook] = useState(null);
    const [errorBook, setErrorBook] = useState(null);
    const [url, setUrl] = useState("");
    const [filter, setFilter] = useState("");

    const updateUrl = (newUrl) => {
        setUrl(newUrl);
      };
    const updateFilter = (newFilter) => {
        setFilter(newFilter);
      };


    const handleSubmit = (e) => {
        e.preventDefault();
        if(filter==="&filter=ebooks&maxResults=12") {
            handleGetBookOnline();
            setShowFilters(false);
        }
        else if(url==="http://localhost:8080/api/book/") {
            handleGetBookLibrary();
            setShowFilters(false);
        }
        else if(filter==="&filter=free-ebooks&maxResults=12"){
            handleGetFreeEbook();
            setShowFilters(false);
        }
        else {
            console.log("some error in url");
        }


          };      // Call your search function with the search query as input
    // const [loginStatus, setLogin] = useState(false);
    const clickHandler = () => {
        setClicked(current=> !current)
    }

    useEffect( () => {
        console.log(clickedStatus);
    }, [clickedStatus]);

    const handleGetBookOnline = () => {
       
        console.log("url in handle book online "+{url})
        axios.get(`${url}${search}${filter}`)
        // axios.get(`https://www.googleapis.com/books/v1/volumes?q='+${search}`+'&filter=ebooks&maxResults=12')
        // axios.get(`https://www.googleapis.com/books/v1/volumes?q='+${search}`)
        .then(response => {
            {console.log({url})}
            setBookData(response.data.items)
            setShowFilters(false)
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
              } })
    }

    const handleGetFreeEbook = () => {
       
        console.log("url in handle free ebook online "+{url})
        axios.get(`${url}${search}${filter}`)
        .then(response => {
            {console.log({url})}
            setBookData(response.data.items)
            setShowFilters(false)
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
              } })
    }

    const handleGetBookLibrary = async () => {
        try {
            const response = await axios.get(`${url}${search}`);
            setBook(response.data);
          } catch (error) {
            console.error(error);
          }
        console.log(`${url}${search}`)
        axios.get(`${url}${search}`)
        // axios.get(`http://localhost:8080/api/book/${search}`)
        .then(response => {
          console.log({search});
          setBook(response.data);
          console.log(response.data)
          if(response.data==null) {
            console.log("User not found");
            setErrorBook("No such User Exists");
          }
          else { 
            setErrorBook(null);
          }
        })
        .catch(errorBook => {
            
            if (errorBook.response && error.response.status === 404) {
                setErrorBook("Please enter your User ID");
                setBook(null);
                console.log(errorBook);
            }
        });
      }

    return (
        <>
        <div className="master">   
            <nav className="NavbarItems">
                               
                <Link to="/">
                    <h2 className="navbar-logo">
                        LibStack
                    </h2>
                </Link>

                <form className="search" onSubmit={handleSubmit}>
                    <button type="submit">
                        <i className="fas fa-search"></i>
                    </button>
                    <input onClick={() => setShowFilters(true)}
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />       
                </form>

                <div className="menu-icons" onClick={clickHandler}>
                    <i className={clickedStatus ? "fas fa-times" : "fas fa-bars"} ></i>
                </div>

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

            {console.log({showFilters})};

            <div className="filterModal">
                {showFilters && <SearchFiltersModal url={url} onUpdateUrl={updateUrl} filter={filter} onUpdateFilter={updateFilter} search={search}  onClose={() => setShowFilters(false)}/>}
            </div>

             <div className="container">
                <Card bookData={bookData}/>
             </div>
            
        </div> 
    </>

    );
}

export default Navbar;