import React from 'react';
import { Router, Route, Switch} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import './App.css';

import {connect} from 'react-redux';

import {createBrowserHistory} from 'history';

import {
    CharacterForm,
    Characters,
    CreateAccount,
    Home,
    Login,
    Navbar,
    PrivateRoute
} from './components';

const history = createBrowserHistory();

class App extends React.Component {
    render() {
        return (
            <Router history={history}>
                <div className="container-fluid">
                    <ToastContainer/>
                    <Navbar/>
                    <div className="row mt-3">
                        <Switch>
                            <Route path="/" exact component={Home}/>
                            <Route path="/create-account" component={CreateAccount}/>
                            <Route path="/login" component={Login}/>
                            <PrivateRoute path="/my-characters" component={Characters}/>
                            <PrivateRoute path="/new-character" component={CharacterForm}/>
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default connect()(App);
