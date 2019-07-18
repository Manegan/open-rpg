import {CONNECTED, CONNECTING} from "../actionTypes";

const initialState = {
    auth: {
        isAuthenticating: false,
        token: null
    }
};

export default function (state = initialState, action) {
    switch(action.type) {
        case CONNECTED: {
            return Object.assign({}, state, {
                auth: {
                    isAuthenticating: false,
                    token: action.payload
                }
            })
        }
        case CONNECTING: {
            return Object.assign({}, state, {
                auth: {
                    isAuthenticating: true
                }
            })
        }
        case DISCONNECTED: {
            return Object.assign({}, state, {
                auth: {
                    isAuthenticating: false,
                    token: null
                }
            })
        }
    }
}