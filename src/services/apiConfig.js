import axios from 'axios';
import authentication from '../authentication';

const config = {
    baseUrl: 'http://localhost:5000/api',
    userEndpoint: '/users',
    roleEndpoint: '/roles'

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
    }
};