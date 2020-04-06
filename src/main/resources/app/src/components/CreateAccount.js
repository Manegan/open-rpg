import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import { createUser } from "../redux/actions"

class CreateAccount extends React.Component {

    mailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            email: "",

            emailIsValid: false,
            emailIsDirty: false
        };
    }

    get emailError() {
        return !this.state.emailIsValid && this.state.emailIsDirty;
    }

    validateEmail(e) {
        this.setState({
            email: e.target.value,
            emailIsValid: this.mailRegex.test(e.target.value)
        });
    }

    showError() {
        console.log(this.emailError);
        return this.emailError ? (<div className="alert alert-danger" role="alert">Invalid Email format</div>): '';
    }

    createUsername(ev) {
        ev.preventDefault();
        if (this.state.username !== "" && this.state.password !== "" && this.state.email !== "" && !this.emailError) {
            this.props.createUser({
                username: this.state.username,
                password: this.state.password,
                email: this.state.email
            }, this.props.history);
            this.setState({
                username: "",
                password: "",
                email: "",

                emailIsValid: false,
                emailIsDirty: false
            })
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="card w-50 m-auto shadow">
                    <div className="card-header">Create a new account</div>
                    <div className="card-body">
                        <form onSubmit={this.createUsername.bind(this)}>
                            <div className="row">
                                <div className="col-10">
                                    <div className="form-group">
                                        <label htmlFor="inputUsername">Username</label>
                                        <input type="text"
                                               id="inputUsername"
                                               className="form-control"
                                               name="username"
                                               value={this.state.username}
                                               onChange={e => this.setState({username: e.target.value})}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputPassword">Password</label>
                                        <input type="password"
                                               id="inputPassword"
                                               className="form-control"
                                               name="password"
                                               value={this.state.password}
                                               onChange={e => this.setState({password: e.target.value})}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputEmail">Email</label>
                                        { this.showError() }
                                        <input type="email"
                                               id="inputEmail"
                                               className="form-control"
                                               name="email"
                                               value={this.state.email}
                                               onFocus={() => this.setState({emailIsDirty: true})}
                                               onChange={e => this.validateEmail(e)}/>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group" style={{ bottom: 0 + "px", position: "absolute" }}>
                                        <button type="submit" className="btn btn-primary"
                                                disabled={this.state.username === "" || this.state.password === "" || this.state.email === "" || this.emailError}
                                        >Submit</button>
                                    </div>
                                </div>
                            </div>
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
)(withRouter(CreateAccount));
