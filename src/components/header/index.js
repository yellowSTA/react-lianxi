import React, { Component } from 'react';
import './index.less'

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: 'yellowstar'
        }
    }

    render() {
        return (
            <header className="header">
                <div className="header-top">
                    <span>欢迎{ this.state.userName }</span>
                    <span className="loginOut">退出</span>
                </div>
                <div className="header-bottom">
                    <span>首页</span>
                    <div>
                        <span>2018-07-03</span>
                        <span>晴天</span>
                    </div>
                </div>
            </header>
        )
    }
}