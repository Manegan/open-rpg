import React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";

class Navbar extends React.Component {

    constructor(props) {
        super();
        this.props = props;
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light row">
                <a className="navbar-brand" href="#">OpenRpg</a>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/create-account" className="nav-link">Create account</Link>
                        </li>
                        <li className="nav-item my-2 my-lg-0 pull-right">
                        </li>
                    </ul>
                    <Link to="/login" className="nav-link">Login</Link>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    ownProps.isAuthenticated = state.auth.isAuthenticated;
    console.log("state to props Navbar:  " + state);
    return ownProps;
};

export default connect(
    mapStateToProps
)(Navbar);