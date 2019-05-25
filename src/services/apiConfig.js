import axios from 'axios';
import authentication from '../authentication';

const config = {
    baseUrl: 'http://localhost:5000/api',
    userEndpoint: '/users',
    roleLevelEndpoint: '/roles/levels',
    roleTypeEndpoint: '/roles/types',
    skillLevelEndpoint: '/skill/levels',
    skillTypeEndpoint: '/skill/types',
    skillTypeLevelEndpoint: '/skill/typelevel'
};

let getHeader = function () {
    let token = authentication.getCachedToken();
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

export default {
    User: {
        get: function (username) {
            let endpoint = config.baseUrl + config.userEndpoint;
            return axios.get(`${endpoint}/${username}`, {headers: getHeader()});
        },
        getAll: function () {
            let endpoint = config.baseUrl + config.userEndpoint;
            return axios.get(endpoint, {headers: getHeader()});
        },
        update: function (userData) {
            let endpoint = `${config.baseUrl + config.userEndpoint}/${userData.username}`;
            return axios
                .put(endpoint, userData, {headers: getHeader()});
        },
        updateRange: function (users) {
            let endpoint = `${config.baseUrl + config.userEndpoint}/update`;
            return axios
                .post(endpoint, users, {headers: getHeader()});
        },
    },
    Skill: {
        getAll: function () {
            let endpoint = config.baseUrl + config.skillTypeEndpoint;
            return axios.get(endpoint, {headers: getHeader()});
        },
        getAllLevels: function () {
            let endpoint = config.baseUrl + config.skillLevelEndpoint;
            return axios.get(endpoint, {headers: getHeader()});
        },
        getAllLevelTypes: function () {
            let endpoint = config.baseUrl + config.skillTypeLevelEndpoint;
            return axios.get(endpoint, {headers: getHeader()});
        },
        updateRange: function (items) {
            let endpoint = `${config.baseUrl + config.skillTypeEndpoint}/update`;
            return axios
                .post(endpoint, items, {headers: getHeader()});
        },
        updateLevelRange: function (items) {
            let endpoint = `${config.baseUrl + config.skillLevelEndpoint}/update`;
            return axios
                .post(endpoint, items, {headers: getHeader()});
        },
        updateTypeLevelRange: function (items) {
            let endpoint = `${config.baseUrl + config.skillTypeLevelEndpoint}/update`;
            return axios
                .post(endpoint, items, {headers: getHeader()});
        },
    },
    Role: {
        getAll: function () {
            let endpoint = config.baseUrl + config.roleLevelEndpoint;
            return axios.get(endpoint, {headers: getHeader()});
        },
        getAllTypes: function () {
            let endpoint = config.baseUrl + config.roleTypeEndpoint;
            return axios.get(endpoint, {headers: getHeader()});
        },
        updateRange: function (items) {
            let endpoint = `${config.baseUrl + config.roleLevelEndpoint}/update`;
            return axios.post(endpoint, items, {headers: getHeader()});

        },
        updateTypeRange: function (items) {
            let endpoint = `${config.baseUrl + config.roleTypeEndpoint}/update`;
            return axios.post(endpoint, items, {headers: getHeader()});

        }
    }
};