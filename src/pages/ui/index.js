import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import './index.less'

export default class Ui extends Component {
    
    render() {
        const { routes, location } = this.props;
        return (
            <div className="ui">
                {
                    location.pathname === '/admin/ui' 
                    ? <Redirect to='/admin/ui/buttons'></Redirect>
                    : routes.map((item, i) => {
                        return <Route exact path={item.path} component= {item.component} key={i}/>
                    })
                }
            </div>
        )
    }
}