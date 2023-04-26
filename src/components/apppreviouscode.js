// import React from 'react';
// import './App.css';
// import AddBookForm from './components/AddBookForm';
// import { Route } from 'react-router-dom';
// import { Routes } from 'react-router-dom';
// import BookList from './components/BookList';
// import { useState, useEffect } from 'react';

// function App() {

//   //This function receives parameters from child onAddBook and maps it to single parameter newBook
//   const handleAddBook = (newBook) => {
//     // add the new book to the database
//     console.log('Adding a new book:', newBook);
//   };
//   const [books, setBooks] = useState([]);

//   useEffect(() => {
//     fetch('/api/books')
//       .then(response => response.json())
//       .then(data => setBooks(data))

//   }, []);

//   return (
//     <div className="App">
    
//         <Routes> 
//           {/* <Route path="/" element={<Home />} /> */}
//           <Route path="/" element={<AddBookForm onAddBook={handleAddBook} />} />
//         </Routes>
//         <BookList books={books}/>
    
//     </div>
//   );
// }

// export default App;