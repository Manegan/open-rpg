import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class PrivateRoute extends React.Component {
    render() {
        const Component = this.props.component;
        const isAuthed = this.props.isAuthenticated;
        return <Route {...this.props} component={props =>
            isAuthed === true
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

export default withRouter(connect(mapStateToProps)(PrivateRoute));
