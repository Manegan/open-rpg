import {CONNECTED, CONNECTING, DISCONNECTED, USER_CREATION_COMPLETED, USER_CREATION_REQUESTED} from "./actionTypes";
import history from '../history';
import { toast } from 'react-toastify';

function requestConnection(user) {
    return {
        type: CONNECTING,
        payload: user
    }
}

function completeConnection(token) {
    history.push("/");
    return {
        type: CONNECTED,
        payload: token
    }
}

export function disconnect() {
    return {
        type: DISCONNECTED
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
        dispatch(requestConnection(user.username));
        return fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify(user)
            })
            .then(response => response.json(), error => console.log("An error has occured", error))
            .then(json => dispatch(completeConnection(json.body.token)))
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
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify(user)
            })
            .then(response => {
                if (response.status == 200) {
                    toast("User " + user.username + " created", {type: toast.TYPE.SUCCESS});
                    return response.json();
                }
                toast("User " + user.username + " already exist", {type: toast.TYPE.ERROR});
            },
                error => {
                console.log("An error has occured", error)
            })
            .then(response => {
                dispatch(userCreated(response.body))
            })
            .catch(err => console.log(err));
    }
}
