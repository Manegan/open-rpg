import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import "./App.css";

import {connect} from "react-redux";

import Home from "./components/Home";
import CreateAccount from "./components/CreateAccount";
import Navbar from "./components/Navbar";

class App extends React.Component() {
    render() {
        return (
            <Router>
                <div className="container-fluid">
                    <Navbar/>
                    <Route path="/" exact component={Home}/>
                    <Route path="/create-account" exact component={CreateAccount}/>
                </div>
            </Router>
        );
    }
}

export default connect()(App);
