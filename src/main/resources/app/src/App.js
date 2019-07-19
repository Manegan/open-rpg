import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import "./App.css";

import {connect} from "react-redux";

import Home from "./components/Home";
import CreateAccount from "./components/CreateAccount";
import Navbar from "./components/Navbar";
import Login from "./components/Login";

class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="container-fluid">
                    <Navbar/>
                    <div className="row mt-3">
                        <Route path="/" exact component={Home}/>
                        <Route path="/create-account" exact component={CreateAccount}/>
                        <Route path="/login" exact component={Login}/>
                    </div>
                </div>
            </Router>
        );
    }
}

export default connect()(App);
