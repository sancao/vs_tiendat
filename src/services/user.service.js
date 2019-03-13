import apiUrl from '../utils/api';
import { authHeader } from '../helpers';

export const userService = {
    login,
    logout,
    getAll
};

function login(email, password) {
    debugger
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${apiUrl}/auth/login`, requestOptions)
        .then(handleResponse)
        .then(res => {
            debugger
            // login successful if there's a jwt token in the response
            if (res.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(res.user));
                localStorage.setItem('token', JSON.stringify(res.token));
            }

            return res.user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    debugger
    return fetch(`${apiUrl}/user/list`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        debugger
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}