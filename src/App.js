import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookViewer from './routes/BookViewer';

import GetUser from './routes/GetUser';
import AddUser from './routes/AddUser';
import UpdateUser from './routes/UpdateUser';
import DeleteUser from './routes/DeleteUser';
import LoginForm from './routes/LoginForm';
import Home from './routes/Home';


import 'font-awesome/css/font-awesome.min.css';
import AppContext from './AppContext';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import BookDescriptionModal from './components/BookDescriptionModal';

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
            <Route path="/" element={<Home />} />
            <Route path="/getUser" element={<GetUser />} />
            <Route path="/addUser" element={<AddUser />} />
            <Route path="/updateUser" element={<UpdateUser />} />
            <Route path="/deleteUser" element={<DeleteUser />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/bookviewer/:id" element={<BookViewer/>} />
          </Routes>
      </div>
    </BrowserRouter>
  </AppContext.Provider>
  );
}

export default App;
