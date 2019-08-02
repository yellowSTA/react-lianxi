import React, { Component } from 'react';
import './index.less'

export default class SimpleHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: 'yellowstar',
        }
    }
    render() {
        const { userName } = this.state;
        return (
            <header className="simple-header">
                <span>欢迎{ userName }</span>
                <span className="loginOut">退出</span>
            </header>
        )
    }
}