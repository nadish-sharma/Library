import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookViewer from './routes/BookViewer';
import LoginForm from './routes/LoginForm';
import Home from './routes/Home';
import AddBookForm from './components/AddBookForm';
import GetBookForm from './components/GetBookForm';
import GetUser from './routes/GetUser';
import IssueBooks from './routes/IssueBooks';
import 'font-awesome/css/font-awesome.min.css';
import AppContext from './AppContext';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  const [bookData, setBookData] = useState([]);
  const [admin, setadmin] = useState(false);
  const [users, setUsers] = useState('');
  const handleGetUsersByAdminStatus = () => {
    axios.get(`/api/user/users?admin=${admin}`)
   .then(response => setUsers(response.data))
   .catch(error => console.error(error));

  }

  return (
  <AppContext.Provider value={{ bookData, setBookData }}>
    <BrowserRouter>
      <div>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/home" element={<Home />} />
            <Route path="/getBook" element={<GetBookForm />} />
            <Route path="/addBook" element={<AddBookForm />} />
            <Route path="/issueBook" element={<IssueBooks />} />
            <Route path="/manageUsers" element={<GetUser />} />
            <Route path="/bookviewer/:id" element={<BookViewer/>} />
          </Routes>
      </div>
    </BrowserRouter>
  </AppContext.Provider>
  );
}

export default App;
