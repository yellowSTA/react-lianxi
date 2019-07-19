import React, { Component } from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import Home from '../home';
import Main from './main'
import About from '../about'
import Topic from '../topic'

export default class Routermaps extends Component {
    render() {
        return (
            <Router>
                <Home>
                    <Route exact={true} path="/" component={Main}></Route>
                    <Route exact={true} path="/about" component={About}></Route>
                    <Route exact={true} path="/topic" component={Topic}></Route>
                </Home>
            </Router>
        )
    }
}