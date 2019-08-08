import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import routes from './router';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './App.css';
import './config';

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                {
                    routes.map((item, i) => {
                        if (item.exact) {
                            return <Route 
                                exact 
                                path={item.path} 
                                key={i} 
                                render={ props => <item.component {...props} routes={item.children}/>}
                            />
                        } else {
                            return <Route path={item.path} key={i} render={ props => (<item.component {...props}  routes={item.children}/>)}/>
                        }
                    })
                }
                <Redirect to='/admin/home'></Redirect>
                </Switch> 
            </Router>
        );
    }
}

export default App;
