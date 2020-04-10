import {
    CHARACTER_DELETE_COMPLETED,
    CHARACTER_DELETE_REQUESTED,
    CHARACTER_FETCH_COMPLETED,
    CHARACTER_FETCH_FAILED,
    DISCONNECTED
} from "../actionTypes";

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
        case CHARACTER_DELETE_REQUESTED:
            return state;
        case CHARACTER_DELETE_COMPLETED:
            return Object.assign({}, state, {
                characters: state.characters.filter(it => it.id !== action.payload)
            })
        default: return state;
    }
}