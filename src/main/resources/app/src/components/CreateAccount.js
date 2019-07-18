import React from 'react';
import {connect} from "react-redux";
import auth from "../redux/reducers/auth";

class CreateAccount extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="card">
                    <div className="card-header">Create a new account</div>
                    <div className="card-body">
                        <form></form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {isAuthenticating: state.auth.isAuthenticating}
};

export default connect(
    mapStateToProps,
    {auth}
)(CreateAccount);
