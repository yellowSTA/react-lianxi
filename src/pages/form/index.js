import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import NoMatch from '../nomatch';

export default class Forms extends Component {
    
    render() {
        const { routes, location } = this.props;
        return (
            <div className="forms">
                <Switch>
                    {
                        location.pathname === '/admin/form' 
                        ? <Redirect to='/admin/form/login'></Redirect>
                        : routes.map((item, i) => {
                            return <Route exact path={item.path} component= {item.component} key={i}/>
                        })
                    }
                    <Route component={NoMatch}/>
                </Switch>
            </div>
        )
    }
}