import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import routes from './router';
import './App.css';

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
            </Switch> 
        </Router>
    );
  }
}

export default App;
