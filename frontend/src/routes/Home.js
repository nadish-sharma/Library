import React from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import "./HomeStyles.css";
import EmbeddedViewer from '../components/EmbeddedViewer';
import { useState } from 'react';
import SearchFiltersModal from '../components/SearchFilterModal';


function Home({show}) {
    const [url, setUrl] = useState('');
    return(
    <>
    {!show && (
        <><Navbar url={url}/>
        {/* <SearchFiltersModal setUrl={setUrl} /> */}
        </>
    )}
        {/* <Navbar /> */}
    </>
    );
}
export default Home;