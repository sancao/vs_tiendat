import apiUrl from '../utils/api';
import { authHeader } from '../helpers';

export const nhapsoService = {
    addNhapso,
    getNhapsoById,
    deleteNhapso,
    updateNhapso,
    getNhapsoAllAndPaging
};

function getNhapsoById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${apiUrl}/nhapso/${id}`, requestOptions)
        .then(handleResponse)
        .then(res => {
            return res.data;
        });
}

function deleteNhapso(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${apiUrl}/nhapso/${id}`, requestOptions)
        .then(handleResponse)
        .then(res => {
            return res.data;
    });
}

function updateNhapso(so) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(so)
    };

    return fetch(`${apiUrl}/nhapso`, requestOptions)
        .then(handleResponse)
        .then(res => {
            return res.data;
    });
}

function addNhapso(so) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(so)
    };

    return fetch(`${apiUrl}/nhapso`, requestOptions)
        .then(handleResponse)
        .then(res => {
            return res.data;
    });
}

function getNhapsoAllAndPaging() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    debugger
    return fetch(`${apiUrl}/nhapso/list`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        debugger
        if (!response.ok) {
            // if (response.status === 401) {
            //     // auto logout if 401 response returned from api
            //     logout();
            //     location.reload(true);
            // }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}