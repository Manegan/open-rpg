import {CHARACTER_FETCH_COMPLETED, CHARACTER_FETCH_FAILED, DISCONNECTED} from "../actionTypes";

const initialState = {
    characters: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CHARACTER_FETCH_COMPLETED:
            return Object.assign({}, state, {
                characters: action.payload || []
            });
        case DISCONNECTED || CHARACTER_FETCH_FAILED:
            return Object.assign({}, state, {
                characters: []
            });
        default: return state;
    }
}