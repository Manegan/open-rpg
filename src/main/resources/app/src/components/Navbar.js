import React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {disconnect} from "../redux/actions";

class Navbar extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
    }

    disconnect() {
        this.props.onDisconnect();
    }

    generateLinks() {
        if (!this.props.isAuthenticated) {
            return <li className="nav-item">
                <Link to="/create-account" className="nav-link">Create account</Link>
            </li>;
        }
        return null;
    }

    generateLogin() {
        if (!this.props.isAuthenticated) {
            return <Link to="/login" className="nav-link">Login</Link>;
        }
        let username = this.props.username;
        return (<div>
            Hello, {username}!&nbsp;
            <button type="button"
                    className="btn btn-primary"
                    onClick={this.disconnect.bind(this)}>Disconnect
            </button>
        </div>);
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light row shadow-sm">
                <a className="navbar-brand" href="#">OpenRpg</a>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        {this.generateLinks()}
                    </ul>
                    {this.generateLogin()}
                </div>
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        username: state.auth.username
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDisconnect: () => {
            dispatch(disconnect());
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Navbar);
