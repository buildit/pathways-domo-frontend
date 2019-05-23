import axios from 'axios';
import authentication from '../authentication';

const config = {
    baseUrl: 'http://localhost:5000/api',
    userEndpoint: '/users',
    roleLevelEndpoint: '/roles/levels',
    roleTypeEndpoint: '/roles/types',
};

let getHeader = function () {
    let token = authentication.getCachedToken();
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    };
    return headers;
};

export default {
    User: {
        get: function (username) {
            let endpoint = config.baseUrl + config.userEndpoint;
            return axios.get(endpoint + '/' + username, {headers: getHeader()});
        },
        updateRange: function (users) {
            let endpoint = config.baseUrl + config.userEndpoint + "/update";

            return axios
                .post(endpoint, users, {headers: getHeader()});

        }
    },
    Role: {
        getAll: function(){
            let endpoint = config.baseUrl + config.roleLevelEndpoint;
            return axios.get(endpoint, {headers: getHeader()});
        },
        getAllTypes: function(){
            let endpoint = config.baseUrl + config.roleTypeEndpoint
            return axios.get(endpoint, {headers: getHeader()});
        },
        updateRange: function (items) {
            let endpoint = config.baseUrl + config.roleLevelEndpoint + "/update";

            return axios
                .post(endpoint, items, {headers: getHeader()});

        },
        updateTypeRange: function (items) {
            let endpoint = config.baseUrl + config.roleTypeEndpoint + "/update";

            return axios
                .post(endpoint, items, {headers: getHeader()});

        }
    }
};