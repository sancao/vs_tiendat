import apiUrl from '../utils/api';
import { authHeader } from '../helpers';

export const giaosoService = {
    addGiaoso,
    getGiaosoById,
    deleteGiaoso,
    updateGiaoso,
    getGiaosoAllAndPaging
};

function getGiaosoById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${apiUrl}/giaoso/${id}`, requestOptions)
        .then(handleResponse)
        .then(res => {
            return res.data;
        });
}

function deleteGiaoso(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${apiUrl}/giaoso/${id}`, requestOptions)
        .then(handleResponse)
        .then(res => {
            return res.data;
    });
}

function updateGiaoso(so) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(so)
    };

    return fetch(`${apiUrl}/giaoso`, requestOptions)
        .then(handleResponse)
        .then(res => {
            return res.data;
    });
}

function addGiaoso(so) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(so)
    };

    return fetch(`${apiUrl}/giaoso`, requestOptions)
        .then(handleResponse)
        .then(res => {
            return res.data;
    });
}

function getGiaosoAllAndPaging() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    debugger
    return fetch(`${apiUrl}/giaoso/list`, requestOptions).then(handleResponse);
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