import React from 'react';
import {connect} from "react-redux";
import { createUser } from "../redux/actions"

class CreateAccount extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    }

    createUsername(ev) {
        ev.preventDefault();
        this.props.createUser({
            username: this.state.username,
            password: this.state.password
        });
        this.setState({
            username: "",
            password: ""
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="card w-50 m-auto shadow">
                    <div className="card-header">Create a new account</div>
                    <div className="card-body">
                        <form>
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
                            <button type="button" className="btn btn-primary"
                                    onClick={this.createUsername.bind(this)}
                                    onSubmit={e => e.preventDefault()}
                                    disabled={this.state.username === "" || this.state.password === ""}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {isAuthenticating: state.auth ? state.auth.isAuthenticating : false}
};

export default connect(
    mapStateToProps,
    {createUser}
)(CreateAccount);
