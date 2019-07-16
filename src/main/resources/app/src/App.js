import React from 'react';
import './App.css';
import {Link, BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./components/Home";

function App() {
    return (
        <Router>
            <div className="container-fluid">
                <ul className={"nav"}>
                    <li className={"nav-item"}>
                        <Link to="/" className={"nav-link"}>Home</Link>
                    </li>
                </ul>
                <Route path="/" exact component={Home}/>
            </div>
        </Router>
    );
}

export default App;
