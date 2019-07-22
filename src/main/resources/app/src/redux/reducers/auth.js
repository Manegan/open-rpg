import {
    CONNECTED,
    CONNECTING,
    CONNECTION_FAILED,
    DISCONNECTED
} from "../actionTypes";

const initialState = {
    username: "",
    isAuthenticated: false,
    isAuthenticating: false,
    token: null
};

export default function (state = initialState, action) {
    switch(action.type) {
        case CONNECTED: {
            return Object.assign({}, state, {
                isAuthenticated: true,
                isAuthenticating: false,
                token: action.payload
            });
        }
        case CONNECTING: {
            return Object.assign({}, state, {
                username: action.payload,
                isAuthenticating: true
            });
        }
        case DISCONNECTED: {
            return Object.assign({}, state, {
                username: "",
                isAuthenticated: false,
                isAuthenticating: false,
                token: null
            });
        }
        case CONNECTION_FAILED: {
            return Object.assign({}, state, {
                isAuthenticated: false,
                isAuthenticating: false,
                token: null
            });
        }
        default: return initialState;
    }
}
