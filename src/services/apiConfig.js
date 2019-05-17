import axios from 'axios';
import authentication from '../authentication';

const config = {
    baseUrl: 'http://localhost:5000/api',
    userEndpoint: '/users'

};

export default {
    updateUsers: function (users) {
        let endpoint = config.baseUrl + config.userEndpoint + "/update";
        let token = authentication.getCachedToken();
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        };

        return axios
            .post(endpoint, users, {headers: headers});

    }
};