import React from 'react';
import Navbar from '../components/Navbar';
import "./HomeStyles.css";

import { useState } from 'react';



function Home({show}) {
    const [url, setUrl] = useState('');
    
    return(
    <>
    {!show && (
        <><Navbar url={url}/>
        </>
    )}
        
    </>
    );
}
export default Home;