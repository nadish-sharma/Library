import "./componentCSS/NavbarStyles.css";
import axios from "axios";
import React, {useRef, useState, useEffect} from "react";
import { Link } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import Card from "./Card";
import logoImg from '../images/logo-img.png';
import SearchFiltersModal from "./SearchFilterModal";
import {BookItemsCRUD} from "./BookItemsCRUD";



function Navbar ({ setShowAdminDashboard, showAdminDashboard, setShowUserDashboard, showUserDashboard, setIsAdmin, setEmail, setPassword}) {

    //We made use of useEffect hook to get updated state value//
    //https://stackoverflow.com/questions/61054275/usestate-with-boolean-value-in-react//
    const [clickedStatus, setClicked] = useState(false); //variable clickedStatus is initially set to False
    //onClick turns false value to true(made use in tertiary if-else statement to show something different on clicking)
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');
    const [bookData, setBookData] = useState([]);
    const [bookDataGoogle, setBookDataGoogle] = useState([]);
    const [bookDataLibrary, setBookDataLibrary] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [placeholderValue, setPlaceholderValue] = useState("Search")
    const [book, setBook] = useState(null);
    const [errorBook, setErrorBook] = useState(null);
    const [url, setUrl] = useState("");
    const [url2, setUrl2] = useState("");
    const [filter, setFilter] = useState("");
    const [logoClickedStatus, setLogoClickedStatus] = useState(false);
    const [filter2, setFilter2] = useState("");
    const [filterNumber, setFilterNumber] = useState(0);
    const [bookComponent, setBookComponent] = useState("false");
    // const [hideSearch, setHideSearch] = useState(false);
    let inputRef = useRef(null);


    const handleLogoClick = (logoClickedStatus) => {
        setLogoClickedStatus(!logoClickedStatus);
        setBookData([]);
        setBook(null);
    }
    const setInputFocus = () => {
        inputRef.current.focus();
      };

    const updateUrl = (newUrl) => {
        setUrl(newUrl);
      };
    const updateUrl2 = (newUrl) => {
        setUrl2(newUrl);
      };
    const updateFilter = (newFilter) => {
        setFilter(newFilter);
      };
      const updateFilter2 = (newFilter) => {
        setFilter2(newFilter);
      };
    const UpdateFilterNumber = (newFilterNumber) => {
        setFilterNumber(newFilterNumber);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if(filterNumber===0) {
          handleGetBooks();
          setShowFilters(false);
        }
        else if(filterNumber===1) {
            handleGetBookLibrary();
            setShowFilters(false);   
        }
        else if(filterNumber===2) {
            handleGetBookOnline();
            setShowFilters(false);
        }
        else if(filterNumber===3 ){
            handleGetFreeEbook();
            setShowFilters(false);
        }
        else if(filterNumber===4) {
            handleGetAllLibraryBooks();
            setShowFilters(false);
        }
        else if(filterNumber===5) {
            handleGetBooksFromEverywhere();
            setShowFilters(false);
        }
        else if(filterNumber===6) {
            handleGetFreeBooksFromEverywhere();
            setShowFilters(false);
        }
        else {
            
            console.log("some error in url");
        }
        console.log({filterNumber});


          }    // Call your search function with the search query as input
   
    
    const clickHandler = () => {
        setClicked(current=> !current)
    }

    useEffect( () => {
        console.log(clickedStatus);
    }, [clickedStatus]);

    const handleGetBooks = async () =>  {
      const urlGoogle = `https://www.googleapis.com/books/v1/volumes?q=${search}&filter=ebooks&maxResults=16`;
      const urlLibrary = `http://localhost:8080/api/book/${search}`;
    
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
        setShowFilters(false);
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
    

    const handleGetBookOnline = () => {
       
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
        // const modifiedQuery = encodeSearch(search);
        
        {console.log(search);}
        try {
            const response = await axios.get(`${url2}${search}`);
            setBookData(response.data);
          } catch (error) {
            console.error(error);
          }
        setFilter('');
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
                setErrorBook("Please enter your User ID");
                // setBookData(null);
                setSearch('');
                console.log(errorBook);
            }
        });
      }

      const handleGetAllLibraryBooks = async () => {
       
        {console.log(search)}
        try {
            const response = await axios.get(`${url2}`);
            setBookData(response.data);
          } catch (error) {
            console.error(error);
          }
        setFilter('');
        console.log(`${url2}`)
        axios.get(`${url2}`)
        
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
                setErrorBook("Please enter your User ID");
                // setBookData(null);
                setSearch('');
                console.log(errorBook);
            }
        })
    }
    const handleGetBooksFromEverywhere = async () => {
      const urlGoogle = `${url}${search}${filter}`;
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
        setShowFilters(false);
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
    
    
      

    const handleGetFreeBooksFromEverywhere = async () => {
      const urlGoogle = `${url}${search}${filter}`;
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
        setShowFilters(false);
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
      
    return (
        <>
        <div className="master">   
            <nav className="NavbarItems">
                <div className="website-logo"></div>               
                  <Link to="/home" onClick={() =>{ handleLogoClick(logoClickedStatus); setSearch('');}}>
                      <img className="navbar-logo" src={logoImg} alt='LibStack'/>
                      {/* <i className="fa-solid fa-book-medical"></i> */}
                  </Link>
                <div/>

                
                  <form className="search" onSubmit={(e) => {handleSubmit(e); setLogoClickedStatus(false);}}>
                    <button type="submit">
                      <i className="fas fa-search"></i>
                    </button>
                    <input
                      onClick={() => setShowFilters(true)}
                      ref={inputRef}
                      type="text"
                      placeholder={placeholderValue}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />       
                  </form>
             

                <div className="menu-icons" onClick={clickHandler}>
                    <i className={clickedStatus ? "fas fa-times" : "fas fa-bars"} ></i>
                </div>

                <ul className={clickedStatus ? "navbar-menu active" : "navbar-menu" }>
                {BookItemsCRUD.map((item, index) => {
                  // Check if showAdminDashboard is true and the item is for admins
                  if (showAdminDashboard || item.admin) {
                    return (
                      <li key={index}>
                        <Link className={item.cName} to={item.url}>
                          <i className={item.icon}></i>
                          {item.title}
                        </Link>
                      </li>
                    );
                  }
                  // Check if showUserDashboard is true and the item is for users
                  if (showUserDashboard || item.user) {
                    return (
                      <li key={index}>
                        <Link className={item.cName} to={item.url}>
                          <i className={item.icon}></i>
                          {item.title}
                        </Link>
                      </li>
                    );
                  }
                  // Exclude items that don't match the current dashboard mode
                  return null;
                })}
               
                  <Link to="/">
                    <button className="navbar-links-mobile" 
                      onClick={()=>
                        {setShowAdminDashboard(false); 
                        setShowUserDashboard(false)
                        setIsAdmin(false);
                        setEmail('');
                        setPassword('');
                        }}
                    > Sign Out</button>
                  </Link>

                </ul>
            </nav>

            {console.log({showFilters})}

            <div className="filterModal">
                {showFilters && <SearchFiltersModal  
                url={url} onUpdateUrl={updateUrl} 
                url2={url2} onUpdateUrl2={updateUrl2}
                filterNumber={filterNumber} onUpdateFilterNumber={UpdateFilterNumber}
                filter={filter} onUpdateFilter={updateFilter}
                filter2={filter2} onUpdateFilter2={updateFilter2}  
                setPlaceholderValue={setPlaceholderValue}
                setInputFocus={setInputFocus}
                onClose={() => setShowFilters(false)}/>}
            </div>
            {!logoClickedStatus && (<div className="container">
                <Card 
                bookData={bookData}
                bookDataGoogle={bookDataGoogle}
                bookDataLibrary={bookDataLibrary} 
                logoClickedStatus={logoClickedStatus} 
                setLogoClickedStatus={setLogoClickedStatus}/>
             </div>) }
             
            
        </div> 
    </>

    );
}

export default Navbar;