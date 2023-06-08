import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import "./LoginFormStyles.css";
import logoImg from '../images/logo-img.png';

 
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(true);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [showUserDashboard, setShowUserDashboard] = useState(false);
  const [loginStatus, setLoginStatus] = useState(true);



  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Send the signup request to the backend API
      const response = await axios.get(`http://localhost:8080/api/user/isAdmin/${isAdmin}`);
      const users = response.data;
      const matchedUser = users.filter(user => user.email === email && user.password === password);
        if(isAdmin) {  
          if(matchedUser.length > 0) {
            setShowAdminDashboard(true);
            console.log({showAdminDashboard});
          }
          else{
            setLoginStatus(false);
            setEmail('');
            setPassword('');
            setIsAdmin(false);
          }
        } else{
          if(matchedUser.length > 0) {
            setShowUserDashboard(true);
            console.log({showUserDashboard});
          }else {
            setLoginStatus(false);
            setEmail('');
            setPassword('');
            setIsAdmin(false);
          }
        }
      console.log(response.data); // Handle successful signup
    } catch (error) {
      console.error(error); // Handle signup error
    }
  };

  return (
    <>
    {!showAdminDashboard && !showUserDashboard &&
    (
    <>
    <div className='login-page'>
      <img className='login-page-logo' src={logoImg} alt='LibStack'/>
    <div className="login-platform">
        <div className='login-contents'>
          <div className='admin-login'>Admin Login</div>
          <form className='login-form'onSubmit={handleSignup}>
            <div>
              <input  type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <input
               
                type="password"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required />
            </div>
            <div>
              {/* <label className='admin'>
                Admin:
                <input
                  type="checkbox"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)} />
              </label> */}
            </div>
            <button type="submit">Sign In</button>
          </form>
          <div className='admin-details'>
            <h5>Sample Admin Login Details</h5>
            <p>email: admin@gmail.com</p>
            <p>password: admin</p>
        </div>
      </div>
      </div>
      {/* <div className='admin-details'>
        <div>
            <h4>Sample Admin Login Details</h4>
            <p>email: admin@gmail.com</p>
            <p>password: admin</p>
        </div> */}
        {/* <div>
            <h4>Sample User Login Details</h4>
            <p>email: vegeta@gmail.com</p>
            <p>password: vegeta</p>
        </div> */}
      {/* </div> */}
      </div>
        </>
    ) }

    {!loginStatus && (
      <h1>Login Failed</h1>
    )}
    {(showAdminDashboard || showUserDashboard) && 
    (<Navbar
      setShowAdminDashboard={setShowAdminDashboard} // Pass the function as a prop
      showAdminDashboard={showAdminDashboard}
      setShowUserDashboard={setShowUserDashboard}
      showUserDashboard={showUserDashboard}
      setIsAdmin={setIsAdmin}
      setEmail={setEmail}
      setPassword={setPassword}
    />
    )}
    </>
  );
}

export default LoginForm;
