import React, { useEffect } from 'react';
import { useState } from 'react';
import Card from '../components/Card';
import Navbar from '../components/Navbar';



function BookViewer({ bookData, id, show }) {
  const [backClickedStatus, setBackClickedStatus] = useState(false);

  if (!show) {
    return null;
  }
  {console.log({id})}
  useEffect(() => {
    const viewer = new window.google.books.DefaultViewer(
      document.getElementById('viewerCanvas')
    );

    viewer.load(`${id}`);
  }, [id]);

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
    </>
  );
}

export default BookViewer;
