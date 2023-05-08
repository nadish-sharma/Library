import React, { useEffect } from 'react';

function BookViewer({ id, show }) {
  if (!show) {
    return null;
  }

  useEffect(() => {
    const viewer = new window.google.books.DefaultViewer(
      document.getElementById('viewerCanvas')
    );

    viewer.load(`${id}`);
  }, [id]);

  return (
    <>
      <div className="canvas" id="viewerCanvas" style={{ width: '50rem', height: '50rem', alignContent:'center' }}></div>
    </>
  );
}

export default BookViewer;
