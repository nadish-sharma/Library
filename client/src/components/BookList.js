import { useState } from "react";

import React from 'react'

export const BookList = () => {
  const[books, setBooks] = useState([])
//   useEffect(() => {

//     getAllBooks();
// }, [])
// const getAllBooks = () => {
//     BookService.getBooks().then((response) => {
//         setBooks(response.data)
//         console.log(response.data);
//     }).catch(error =>{
//         console.log(error);
//     })
// }

  return (
    <div className="container">
        <h2 className="text-center">List of Books</h2>
        <table className="table table-bordered table-striped">
            <thead>
                <th>id</th>
                <th>title</th>
                <th>author</th>
                <th>isbn</th>
            </thead>
            <tbody>
                {books.map((book) =>
                    <tr key = {book.id}>
                        <td>{book.id}</td>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.isbn}</td>
                    </tr>
                 )
                }   
            </tbody>
        </table>
    </div>
  );
            }
export default BookList;