import {USER_CREATION_COMPLETED, USER_CREATION_FAILED, USER_CREATION_REQUESTED} from "../actionTypes";

const initialState = {
    user: {
        creationPending: false,
        creationSucceeded: false,
        creationFailed: false
    }
};

export default function user(state = initialState, action) {
    switch(action.type) {
        case USER_CREATION_REQUESTED: {
            return Object.assign({}, state, {
                user: {
                    creationPending: true
                }
            });
        }
        case USER_CREATION_COMPLETED: {
            return Object.assign({}, state, {
                user: {
                    creationSucceeded: true
                }
            });
        }
        case USER_CREATION_FAILED: {
            return Object.assign({}, state, {
                user: {
                    creationFailed: true
                }
            });
        }
        default: return initialState;
}
}
