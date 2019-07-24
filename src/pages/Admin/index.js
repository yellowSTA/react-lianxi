import React, { Component } from 'react';
import SideBar from '../../components/SideBar';
import Header from '../../components/header';
import Footer from '../../components/Footer';
import { Route } from 'react-router-dom';
import Home from '../Home'

export default class Admin extends Component {
    render() {
        return (
            <div className="g-page">
                <SideBar></SideBar>
                <div className="g-wrap">
                    <Header/>
                    <div className="g-container">
                        { Child(this.props) }
                    </div>
                    <Footer/>
                </div>
            </div>
        )
    }
}

function Child(props) {
    const { routes, location } = props;

    if(location.pathname === '/admin') {
        return (<Route to="/" exact component={Home}></Route>)
    }
    return(
        routes.map((item, i) => {
            return <Route path={item.path} key={i} render={ props => (<item.component {...props}  routes={item.children}/>)}/>
        })
    )
}