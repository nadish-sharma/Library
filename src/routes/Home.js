import React from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import "./HomeStyles.css";
import EmbeddedViewer from '../components/EmbeddedViewer';


function Home() {
    return(
    <>
        <Navbar />
        <div className="home-class"></div>
        {/* <EmbeddedViewer /> */}
    </>
    );
}
export default Home;