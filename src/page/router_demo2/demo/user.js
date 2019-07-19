import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import UserAdd from './userAdd';

export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: '我是一个user组件'
        }
    }

    componentWillMount() {
        console.log(this.props.routes)
    }

    render() {
        const {routes} = this.props;
        console.log(routes && routes.length ? true : false)
        return (
            <Router>
                    <div className="user">
                        <ul>
                            <li>
                                <Link to="/user/">用户列表</Link>
                            </li>
                            <li>
                                <Link to="/user/add">增加用户</Link>
                            </li>
                            <li>
                                <Link to="/user/edit">编辑用户</Link>
                            </li>
                        </ul>
                        <Route exact path="/user/add" component={UserAdd} />
                        {
                            /* routes && routes.length 
                            ? this.props.routes.map((route, index) => {
                                return   <Route key={index} exact path={route.path} component={route.component} />
                            })
                            : '' */
                        }
                    </div>
            </Router>
            
        )
    }
}