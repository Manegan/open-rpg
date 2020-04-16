import {
    CHARACTER_DELETE_COMPLETED,
    CHARACTER_DELETE_REQUESTED,
    CHARACTER_FETCH_COMPLETED,
    CHARACTER_FETCH_FAILED, CHARACTER_FETCH_REQUESTED,
    DISCONNECTED
} from "../actionTypes";

const initialState = {
    characters: [],
    loading: false,
    error: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CHARACTER_FETCH_REQUESTED:
            return Object.assign({}, state, {
                characters: [],
                loading: true
            });
        case CHARACTER_FETCH_COMPLETED:
            return Object.assign({}, state, {
                characters: action.payload || [],
                loading: false
            });
        case DISCONNECTED:
            return Object.assign({}, state, {
                characters: [],
                loading: false
            });
        case CHARACTER_FETCH_FAILED:
            return Object.assign({}, state, {
                characters: [],
                loading: false,
                error: "Could not fetch characters... Try again later."
            })
        case CHARACTER_DELETE_REQUESTED:
            return state;
        case CHARACTER_DELETE_COMPLETED:
            return Object.assign({}, state, {
                characters: state.characters.filter(it => it.id !== action.payload)
            })
        default: return state;
    }
}