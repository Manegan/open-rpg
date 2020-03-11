import React from 'react';
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
        this.props.login({
            username: this.state.username,
            password: this.state.password
        }, this.props.history);
        this.setState({
            username: "",
            password: ""
        })
    }

    render() {
        return (
        <div className="container">
            <div className="card m-auto shadow">
                <div className="card-header">Login</div>
                <div className="card-body">
                    <form>
                        <div className="row">
                            <div className="col-10">
                                <div className="form-group">
                                    <label htmlFor="inputUsername">Username</label>
                                    <input type="text"
                                           id="inputUsername"
                                           className="form-control"
                                           name="username"
                                           value={this.state.username}
                                           onChange={(e) => this.setState({username: e.target.value})}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputPassword">Password</label>
                                    <input type="password"
                                           id="inputPassword"
                                           className="form-control"
                                           name="password"
                                           value={this.state.password}
                                           onChange={(e) => this.setState({password: e.target.value})}/>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="form-group" style={{ bottom: 0 + "px", position: "absolute" }}>
                                    <button type="button" className="btn btn-primary"
                                            onClick={this.login.bind(this)}
                                            onSubmit={e => e.preventDefault()}
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

export default connect(
    null,
    {login}
)(Login);