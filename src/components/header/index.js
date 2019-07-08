import React, { Component } from 'react';
import './index.less';
const dateFormat = require('js-dateformat').dateFormat;

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: 'yellowstar',
            currentTime: ''
        }
    }

    componentWillMount() {
        this.timer = setInterval(() => {
            const time = dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss');
            this.setState({
                currentTime: time
            })
        },1000)
    }

    render() {
        const { currentTime, userName } = this.state;
        return (
            <header className="header">
                <div className="header-top">
                    <span>欢迎{ userName }</span>
                    <span className="loginOut">退出</span>
                </div>
                <div className="header-bottom">
                    <span>首页</span>
                    <div>
                        <span className="time">{ currentTime }</span>
                        <span>晴天</span>
                    </div>
                </div>
            </header>
        )
    }
}