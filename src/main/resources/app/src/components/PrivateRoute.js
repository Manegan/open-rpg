import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class PrivateRoute extends React.Component {
    render() {
        const Component = this.props.component;
        return <Route {...this.props} render={props =>
            props.isAuthenticated === true
                ? <Component {...props} />
                : <Redirect to='/login'/>
        } />
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
