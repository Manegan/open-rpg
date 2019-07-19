import React from "react";
import {connect} from "react-redux";
import {login} from "../redux/actions";

class Login extends React.Component {

    constructor(props) {
        super();
        this.props = props;
        this.state = {
            form: {
                username: null,
                password: null
            }
        }
    }

    login(e) {
        e.preventDefault();
        this.props.login(this.state.form);
        this.setState({
            form: {
                username: null,
                password: null
            }
        })
    }

    updateUsername(e) {
        let state = this.state;
        state.form.username = e.target.value;
    }

    updatePassword(e) {
        let state = this.state;
        state.form.password = e.target.value;
    }

    render() {
        return (
        <div className="container-fluid">
            <div className="card">
                <div className="card-header">Login</div>
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="inputUsername">Username</label>
                            <input type="text"
                                   id="inputUsername"
                                   className="form-control"
                                   name="username"
                                   onChange={this.updateUsername.bind(this)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPassword">Password</label>
                            <input type="password"
                                   id="inputPassword"
                                   className="form-control"
                                   name="password"
                                   onChange={this.updatePassword.bind(this)}/>
                        </div>
                        <button type="button" className="btn btn-primary"
                                onClick={this.login.bind(this)}
                                onSubmit={e => e.preventDefault()}>Submit</button>
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