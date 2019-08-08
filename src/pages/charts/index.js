import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import NoMatch from '../nomatch';
import './index.less';

export default class Charts extends Component {
    render() {
        const { routes, location } = this.props;
        return (
            <div className="chartsPage">
                <Switch>
                    {
                        location.pathname === '/admin/charts' 
                        ? <Redirect to='/admin/charts/bar'></Redirect>
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