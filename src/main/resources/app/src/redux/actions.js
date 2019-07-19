import {CONNECTED, CONNECTING, USER_CREATION_COMPLETED, USER_CREATION_REQUESTED} from "./actionTypes";

function requestConnection() {
    return {
        type: CONNECTING
    }
}

function completeConnection(token) {
    return {
        type: CONNECTED,
        payload: token
    }
}

function requestCreateUser() {
    return {
        type: USER_CREATION_REQUESTED
    }
}

function userCreated(user) {
    return {
        type: USER_CREATION_COMPLETED,
        payload: user
    }
}

export function login(user) {
    return function (dispatch) {
        dispatch(requestConnection());
        console.log(JSON.stringify(user));
        return fetch("http://localhost:8080/login", {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json"
                },
                mode: "no-cors"
            })
            .then(response => response.json(), error => console.log("An error has occured", error))
            .then(json => dispatch(completeConnection(json.token)))
            .catch(err => console.log(err));
    }
}

export function createUser(user) {
    return function (dispatch) {
        dispatch(requestCreateUser());
        user.enabled = true;
        user.roles = [];
        return fetch("http://localhost:8080/api/user", {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json"
                },
                mode: "no-cors"
            })
            .then(Object.json.apply, error => console.log("An error has occured", error))
            .then(json => dispatch(userCreated(json)))
            .catch(err => console.log(err));
    }
}
