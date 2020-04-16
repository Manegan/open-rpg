import React from 'react';
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {disconnect} from "../redux/actions";

class Navbar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            menu: false
        }
    }

    generateLinks() {
        if (!this.props.isAuthenticated) {
            return null;
        }
        return [
            <li className="nav-item">
                <Link to="/my-characters" className="nav-link">My Characters</Link>
            </li>
        ];
    }

    generateLogin() {
        if (!this.props.isAuthenticated) {
            return <Link to="/login" className="nav-link">Login</Link>;
        }
        return <button type="button"
                    className="btn btn-primary"
                    onClick={() => this.props.onDisconnect(this.props.history)}
                    key="disconnect">Disconnect
            </button>;
    }

    render() {
        const show = this.state.menu ? "show" : ""

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light row shadow-sm">
                <span className="navbar-brand">OpenRpg</span>
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => this.setState({menu: !this.state.menu})}
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className={"collapse navbar-collapse " + show} id="navbarSupportedContent">
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
        onDisconnect: (history) => {
            dispatch(disconnect(history));
        }
    }
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Navbar));
