import {CONNECTED, CONNECTING} from "./actionTypes";

function requestConnection(user) {
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

export function connect(user) {
    return function (dispatch) {
        dispatch(requestConnection(user));
        return fetch({
                url: "http://localhost:8080/login",
                method: "POST",
                body: JSON.stringify(user)
            })
            .then(response => response.json(), error => console.log("An error has occured", error))
            .then(json => dispatch(completeConnection(json.token)));
    }
}