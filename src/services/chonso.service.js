import Axios from 'axios'
import apiUrl from '../utils/api';
import { authHeader } from '../helpers';

export const chonsoService = {
    addOrUpdate,
    invePdf,
    deleteSo,
    getChonsoAllAndPaging,
    getDanhSachDai
};

function invePdf(id) {
    const requestOptions = {
        method: 'GET',
        responseType: 'arraybuffer',
        headers: authHeader()
    };

    return Axios.get(`${apiUrl}/chonso/inve-pdf/${id}`,requestOptions)
}

function getDanhSachDai(){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${apiUrl}/danh-sach-dai-trong-ngay`, requestOptions)
        .then(handleResponse)
        .then(res => {
            debugger
            return res.data;
    });
}

function deleteSo(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${apiUrl}/chonso/${id}`, requestOptions)
        .then(handleResponse)
        .then(res => {
            return res.data;
    });
}

function addOrUpdate(so) {
    debugger
    return Axios.post(`${apiUrl}/chonso/add`,so,{headers:authHeader()})
}

function getChonsoAllAndPaging(current_page,text_search) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return Axios.get(`${apiUrl}/chonso/list?page='${current_page}'&text='${text_search}`,requestOptions)
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