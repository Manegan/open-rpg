import {CONNECTED, CONNECTING, DISCONNECTED, USER_CREATION_COMPLETED, USER_CREATION_REQUESTED} from "./actionTypes";
import { toast } from 'react-toastify';

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
                    toast("Successfully logged in.", {type: toast.TYPE.SUCCESS});
                    return response.json();
                }
                toast("Wrong username or password.", {type: toast.TYPE.ERROR})
            }, error => toast("An error occurred.", {type: toast.TYPE.ERROR}))
            .then(json => dispatch(completeConnection(json.token, history)))
            .catch(err => console.log(err));
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
                    toast("User " + user.username + " created.", {type: toast.TYPE.SUCCESS});
                    return response.json();
                }
                toast("User " + user.username + " already exist.", {type: toast.TYPE.ERROR});
            }, __ => toast("An error occurred.", {type: toast.TYPE.ERROR}))
            .then(response => dispatch(userCreated(response.body, history)))
            .catch(err => console.log(err));
    }
}
