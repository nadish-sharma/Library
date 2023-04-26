import React, { useEffect } from 'react';

function EmbeddedViewer () {
    const google=window.google;
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://www.google.com/books/jsapi.js';
        script.async = true;
        document.body.appendChild(script);
        
        script.onload = () => {
            google.books.load(); 
            function initialize() {
                let viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'));
                viewer.load('ISBN:0738531367'); 
            }
            google.books.setOnLoadCallback(initialize);
        };
        
        return () => {
            document.body.removeChild(script);
        };
    }, []);
    
    return (
        <div id="viewerCanvas" style={{width: "600px", height: "500px"}}></div>
    );
}

export default EmbeddedViewer;
