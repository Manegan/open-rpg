import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class PrivateRoute extends Route {
    render() {
        const Component = this.props.component;
        return this.props.isAuthenticated === true
            ? <Component {...this.props} />
            : <Redirect to='/login' />;
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
};

export default connect(
    mapStateToProps
)(PrivateRoute);
