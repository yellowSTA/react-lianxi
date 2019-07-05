import React from 'react';
import SideBar from './components/SideBar'
import Header from './components/header'
import './App.css'

function App() {
    return (
        <div className="g-container">
            <SideBar></SideBar>
            <div className="g-content">
                <Header/>
            </div>
        </div>
    );
}

export default App;