// import axios from "axios";
// import React from "react"
// import { useState } from "react";
// import "./componentCSS/NavbarSearchStyles.css";
// import SearchFiltersModal from "./SearchFilterModal";
// import Navbar from "./Navbar";
// import Home from "../routes/Home";

//  function NavbarSearch({url}) {

//     const [search, setSearch] = useState('');
//     const [error, setError] = useState('');
//     const [bookData, setBookData] = useState([]);
//     const [showFilters, setShowFilters] = useState(false);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log("inside handle submit")
//         console.log("url in handle submit: "+{url})
//         axios.get(`${url}${search}&filter=ebooks&maxResults=12`)
//         // axios.get(`https://www.googleapis.com/books/v1/volumes?q='+${search}`+'&filter=ebooks&maxResults=12')
//         // axios.get(`https://www.googleapis.com/books/v1/volumes?q='+${search}`)
//         .then(response => {
//             {console.log({url})}
//             setBookData(response.data.items)
//             setShowFilters(false)
//             console.log(response.data.items)
//             if(response.data==null) {
//               console.log("No such book found");
//               setError("No such Book Exists");
//               setSearch('');
//             }
//             else { 
//               setError(null);
//               setSearch('');
//             }
//           })
//           .catch(error => {
              
//               if (error.response && error.response.status === 200) {
//                   setError("Unknown error");
//                   setSearch(null);
//                   console.log(error);
//               }
//           });      // Call your search function with the search query as input
//     }
//     return(
//       <><form className="search" onSubmit={handleSubmit}>
//             <button type="submit">
//                 <i className="fas fa-search"></i>
//             </button>
//             <input onClick={() => setShowFilters(true)}
//                 type="text"
//                 placeholder="Search"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)} />
//         </form>
//         <Home url={url} showFiltersAgain= {showFilters} search={search} bookData={bookData} />
//        </>
//     );
// }
// export default NavbarSearch;