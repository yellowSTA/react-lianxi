import React, { Component } from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import routes from './router'

export default class Main extends Component {
    render() {
        return (
            <Router>
                <ul>
                    <li>
                        <Link to="/">home</Link>
                    </li>
                    <li>
                        <Link to="/about">about</Link>
                    </li>
                    <li>
                        <Link to="/topic">topic</Link>
                    </li>
                    <li>
                        <Link to="/user">user</Link>
                    </li>
                </ul>
                {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
                {
                    /*routes.map((route, index) => {
                         if(route.exact) {
                            return <Route 
                                    key={index} 
                                    exact={true}
                                    path={route.path}
                                    render = {
                                        props => (
                                            <route.component {...props} routes={route.children} />
                                        )
                                    }
                                    />
                        } else {
                            return <Route
                                    key={index}
                                    path={route.path}
                                    render={
                                        props => (
                                            <route.component {...props} routes={route.children} />
                                        )
                                    }
                                    />
                        } 
                    })*/
                }
            </Router>
        )
    }
}

function RouteWithSubRoutes(route) {
    return ( <
        Route path = { route.path } exact = { route.exact } render = {
            props => ( <route.component { ...props } routes = { route.children }/>)
        }
        />
    );
}

/* import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import routes from './router'

// Some folks find value in a centralized route config.
// A route config is just data. React is great at mapping
// data into components, and <Route> is a component.

////////////////////////////////////////////////////////////
// first our route components
function Sandwiches() {
  return <h2>Sandwiches</h2>;
}

function Tacos({ routes }) {
  return (
    <div>
      <h2>Tacos</h2>
      <ul>
        <li>
          <Link to="/tacos/bus">Bus</Link>
        </li>
        <li>
          <Link to="/tacos/cart">Cart</Link>
        </li>
      </ul>

      {routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route} />
      ))}
    </div>
  );
}

function Bus() {
  return <h3>Bus</h3>;
}

function Cart() {
  return <h3>Cart</h3>;
}
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => (
        <route.component {...props} routes={route.children} />
      )}
    />
  );
}

function RouteConfigExample() {
  return (
    <Router>
      <div>
      <ul>
                    <li>
                        <Link to="/">home</Link>
                    </li>
                    <li>
                        <Link to="/about">about</Link>
                    </li>
                    <li>
                        <Link to="/topic">topic</Link>
                    </li>
                    <li>
                        <Link to="/user">user</Link>
                    </li>
                </ul>

        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </div>
    </Router>
  );
}

export default RouteConfigExample; */