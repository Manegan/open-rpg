import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import "./App.css";

import {connect} from "react-redux";

import Home from "./components/Home";
import CreateAccount from "./components/CreateAccount";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Rulesets from "./components/Rulesets";
import PrivateRoute from "./components/PrivateRoute";
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
                        <PrivateRoute path="/rpg-rulesets" exact component={Rulesets}/>
                    </div>
                </div>
            </Router>
        );
    }
}

export default connect()(App);
