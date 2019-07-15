import React from 'react';
import SideBar from './components/SideBar'
import Header from './components/header'
import Footer from './components/Footer'
import Home from './page/Home'
import './App.css'

function App() {
    return (
        <div className="g-page">
            <SideBar></SideBar>
            <div className="g-wrap">
                <Header/>
                <div className="g-container">
                    <Home/>
                </div>
                <Footer/>
            </div>
        </div>
    );
}

export default App;