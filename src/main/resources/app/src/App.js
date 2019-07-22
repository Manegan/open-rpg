import React from 'react';
import {Router, Route} from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import "./App.css";

import {connect} from "react-redux";

import Home from "./components/Home";
import CreateAccount from "./components/CreateAccount";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import history from "./history";

class App extends React.Component {
    render() {
        return (
            <Router history={history}>
                <div className="container-fluid">
                    <ToastContainer/>
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
