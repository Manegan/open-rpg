import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../redux/actions';
import {Link} from 'react-router-dom';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            username: "",
            password: ""
        }
    }

    login(e) {
        e.preventDefault();
        if (this.state.username !== "" && this.state.password !== "") {
            this.props.login({
                username: this.state.username,
                password: this.state.password
            }, this.props.history);
            this.setState({
                username: "",
                password: ""
            })
        }
    }

    render() {
        return (
        <div className="container-fluid">
            <div className="card m-auto shadow">
                <div className="card-header">Login</div>
                <div className="card-body">
                    <form onSubmit={this.login.bind(this)}>
                        <div className="row">
                            <div className="col-10">
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input type="text"
                                           id="username"
                                           className="form-control"
                                           name="username"
                                           value={this.state.username}
                                           onChange={(e) => this.setState({username: e.target.value})}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password"
                                           id="password"
                                           className="form-control"
                                           name="password"
                                           value={this.state.password}
                                           onChange={(e) => this.setState({password: e.target.value})}/>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="form-group" style={{ bottom: 0 + "px", position: "absolute" }}>
                                    <button type="submit" className="btn btn-primary"
                                            disabled={this.state.username === "" || this.state.password === ""}>Submit</button>
                                </div>
                            </div>
                        </div>
                        <Link to="/create-account" className="nav-link">New here? Create an account.</Link>
                    </form>
                </div>
            </div>
        </div>);
    }
}

export default withRouter(connect(
    null,
    {login}
)(Login));