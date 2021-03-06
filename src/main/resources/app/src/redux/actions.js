import {
    CHARACTER_DELETE_COMPLETED,
    CHARACTER_DELETE_REQUESTED,
    CHARACTER_FETCH_COMPLETED,
    CHARACTER_FETCH_FAILED,
    CHARACTER_FETCH_REQUESTED,
    CONNECTED,
    CONNECTING,
    DISCONNECTED,
    USER_CREATION_COMPLETED,
    USER_CREATION_REQUESTED
} from "./actionTypes";
import {TOAST_ERROR, TOAST_SUCCESS} from '../utils/toast.options.util';
import {toast} from 'react-toastify';

function requestConnection(user) {
    return {
        type: CONNECTING,
        payload: user
    }
}

function completeConnection(token, history) {
    history.push("/");
    return {
        type: CONNECTED,
        payload: token
    }
}

export function disconnect(history) {
    history.push("/");
    return {
        type: DISCONNECTED
    }
}

function requestCreateUser() {
    return {
        type: USER_CREATION_REQUESTED
    }
}

function userCreated(user, history) {
    history.push("/login");
    return {
        type: USER_CREATION_COMPLETED,
        payload: user
    }
}

function requestAllCharacters() {
    return {
        type: CHARACTER_FETCH_REQUESTED
    }
}

function charactersFetched(characters) {
    return {
        type: CHARACTER_FETCH_COMPLETED,
        payload: characters
    }
}

function requestCharactersFailed() {
    return {
        type: CHARACTER_FETCH_FAILED
    }
}

function requestDeleteCharacter(id) {
    return {
        type: CHARACTER_DELETE_REQUESTED,
        payload: id
    }
}

function characterDeleted(id) {
    return {
        type: CHARACTER_DELETE_COMPLETED,
        payload: id
    }
}

export function login(user, history) {
    return function (dispatch) {
        dispatch(requestConnection(user.username));
        return fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify(user)
            })
            .then(response => {
                if (response.status === 200) {
                    toast("Successfully logged in.", TOAST_SUCCESS);
                    return response.json();
                }
                toast("Wrong username or password.", TOAST_ERROR)
            }, __ => toast("An error occurred.", TOAST_ERROR))
            .then(json => dispatch(completeConnection(json.token, history)))
            .catch(console.log);
    }
}

export function createUser(user, history) {
    return function (dispatch) {
        dispatch(requestCreateUser());
        user.enabled = true;
        user.roles = [];
        return fetch("http://localhost:8080/api/user", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify(user)
            })
            .then(response => {
                if (response.status === 201) {
                    toast("Your account has been successfully created.", TOAST_SUCCESS);
                    return response.json();
                }
                toast("User " + user.username + " already exist.", TOAST_ERROR);
            }, __ => toast("An error occurred.", TOAST_ERROR))
            .then(response => dispatch(userCreated(response, history)))
            .catch(console.error);
    }
}

export function getCharacters(token, page, size) {
    return function (dispatch) {
        dispatch(requestAllCharacters());
        return fetch(`http://localhost:8080/api/characters?size=${size}&page=${page}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": "Bearer " + token
            }
        })
        .then(response => {
            if (response.status === 200) return response.json()
            dispatch(requestCharactersFailed())
            if (response.status === 401) toast("Could not fetch characters, UNAUTHORIZED.", TOAST_ERROR)
            if (response.status === 403) toast("Access FORBIDDEN.", TOAST_ERROR)
        }, __ => toast("An error occurred.", TOAST_ERROR))
        .then(response => dispatch(charactersFetched(response)))
        .catch(console.error)
    }
}

export function deleteCharacter(character, token) {
    return function(dispatch) {
        dispatch(requestDeleteCharacter(character.id))
        return fetch(`http://localhost:8080/api/characters/${character.id}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": "Bearer " + token
            }
        })
        .then(response => {
            if (response.status === 200) {
                toast(`Character with name ${character.name} has been deleted.`, TOAST_SUCCESS)
                return response;
            }
            toast(`Could not delete Character with name ${character.name}.`, TOAST_ERROR)
        }, __ => toast("An error occurred.", TOAST_ERROR))
        .then(__ => dispatch(characterDeleted(character.id)))
        .catch(console.error)
    }
}
