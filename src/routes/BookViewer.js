import React, { useEffect } from 'react';
<<<<<<< HEAD
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Navbar from '../components/Navbar';



function BookViewer({ bookData, id, show }) {
  const history = useNavigate();
  const [backClickedStatus, setBackClickedStatus] = useState(false);

  if (!show) {
    return null;
  }

=======

function BookViewer({ id, show }) {
  if (!show) {
    return null;
  }
  {console.log({id})}
>>>>>>> dde8b8ac7aaef29180a3a05d85e342cbfd5a4526
  useEffect(() => {
    const viewer = new window.google.books.DefaultViewer(
      document.getElementById('viewerCanvas')
    );

    viewer.load(`${id}`);
  }, [id]);

<<<<<<< HEAD
  const handleBackClick = () => {
    setBackClickedStatus(true);
    // history.push("/"); // Go back to the previous page (search results)
  };

  return (
    <>
      {!backClickedStatus ? (
        <>
        <div className="viewer-master">
          <div className="canvas" id="viewerCanvas" style={{ width: '50rem', height: '50rem', alignContent: 'center' }}></div>
          <div><button onClick={handleBackClick}>Back</button></div>
        </div>
        </>
      ) : (
        
        <div className="master">
          <div className="container">
              <Card bookData={bookData} />
          </div>
        </div>
      )}
=======
  return (
    <>
      <div className="canvas" id="viewerCanvas" style={{ width: '50rem', height: '50rem', alignContent:'center' }}></div>
>>>>>>> dde8b8ac7aaef29180a3a05d85e342cbfd5a4526
    </>
  );
}

export default BookViewer;
