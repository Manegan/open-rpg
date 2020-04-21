import {USER_CREATION_COMPLETED, USER_CREATION_FAILED, USER_CREATION_REQUESTED} from "../actionTypes";

const initialState = {
    creationPending: false,
    creationSucceeded: false,
    creationFailed: false
};

export default function user(state = initialState, action) {
    switch(action.type) {
        case USER_CREATION_REQUESTED: {
            return Object.assign({}, state, {
                creationPending: true,
                creationSucceeded: false,
                creationFailed: false
            });
        }
        case USER_CREATION_COMPLETED: {
            return Object.assign({}, state, {
                creationPending: false,
                creationSucceeded: true,
                creationFailed: false
            });
        }
        case USER_CREATION_FAILED: {
            return Object.assign({}, state, {
                creationPending: false,
                creationSucceeded: false,
                creationFailed: true
            });
        }
        default: return initialState;
}
}
