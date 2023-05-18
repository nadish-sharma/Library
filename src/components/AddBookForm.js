import React, { useState } from 'react';

function AddBookForm(props) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [bookCount, setBookCount] = useState(0);

  
  const handleSubmit = (e) => {
    e.preventDefault();

    // Call a function to add the new book to the database
    //We are sending details of book: title, author and isbn to the parent App
    props.onAddBook({
      title: title,
      author: author,
      isbn: isbn
    });

    //increase number of books counter
    setBookCount(bookCount + 1);
    
    // Clear the form inputs
    setTitle('');
    setAuthor('');
    setIsbn('');
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
      </div>
      <div>
        <label htmlFor="isbn">ISBN:</label>
        <input type="text" id="isbn" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
      </div>
      <button type="submit">Add Book</button>
    </form>
    <div>
        {bookCount}
    </div>
    </>
  );
}

export default AddBookForm;
