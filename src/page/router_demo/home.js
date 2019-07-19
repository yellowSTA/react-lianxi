import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

export default class Home extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li><Link to="/">home</Link></li>
                    <li><Link to="/about">about</Link></li>
                    <li><Link to="/topic">topic</Link></li>
                </ul>
                <hr></hr>
                {this.props.children}
            </div>
        )
    }
}