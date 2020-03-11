import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import './App.css';

import {connect} from 'react-redux';

import Home from './components/Home';
import CreateAccount from './components/CreateAccount';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Rulesets from './components/Rulesets';
import PrivateRoute from './components/PrivateRoute';
import {createBrowserHistory} from "history";

const history = createBrowserHistory();

class App extends React.Component {
    render() {
        return (
            <BrowserRouter history={history}>
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
            </BrowserRouter>
        );
    }
}

export default connect()(App);
