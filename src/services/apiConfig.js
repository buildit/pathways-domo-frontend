import axios from 'axios';
import MSALAuthService from '../authentication';

const config = {
    //baseUrl: 'http://localhost:5000/api',
    baseUrl: 'https://pathways.buildit.systems/api',
    userEndpoint: '/users',
    roleLevelEndpoint: '/roles/levels',
    roleTypeEndpoint: '/roles/types',
    skillLevelEndpoint: '/skill/levels',
    skillTypeEndpoint: '/skill/types',
    skillTypeLevelEndpoint: '/skill/typelevel',
    roleLevelRuleEndpoint: '/rolelevelrule',
    userSkillEndpoint: '/userskill'
};

class ApiBase {
    constructor(token) {
        this.token = token;
    }

    getHeader() {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
        };
    }
}

class UserApi extends ApiBase {
    constructor(token) {
        super(token);
    }

    get(username) {
        let endpoint = config.baseUrl + config.userEndpoint;
        return axios.get(`${endpoint}/${username}`, {headers: this.getHeader()});
    }

    getAll() {
        let endpoint = config.baseUrl + config.userEndpoint;
        return axios.get(endpoint, {headers: this.getHeader()});
    }

    update(userData) {
        let endpoint = `${config.baseUrl + config.userEndpoint}/${userData.username}`;
        return axios
            .put(endpoint, userData, {headers: this.getHeader()});
    }

    updateRange(users) {
        let endpoint = `${config.baseUrl + config.userEndpoint}/update`;
        return axios
            .post(endpoint, users, {headers: this.getHeader()});
    }z

}

class SkillsApi extends ApiBase {
    constructor(token) {
        super(token);
    }

    getAll() {
        let endpoint = config.baseUrl + config.skillTypeEndpoint;
        return axios.get(endpoint, {headers: this.getHeader()});
    }


    getAllLevels() {
        let endpoint = config.baseUrl + config.skillLevelEndpoint;
        return axios.get(endpoint, {headers: this.getHeader()});
    }


    getAllLevelTypes() {
        let endpoint = config.baseUrl + config.skillTypeLevelEndpoint;
        return axios.get(endpoint, {headers: this.getHeader()});
    }


    updateRange(items) {
        let endpoint = `${config.baseUrl + config.skillTypeEndpoint}/update`;
        return axios
            .post(endpoint, items, {headers: this.getHeader()});
    }


    updateLevelRange(items) {
        let endpoint = `${config.baseUrl + config.skillLevelEndpoint}/update`;
        return axios
            .post(endpoint, items, {headers: this.getHeader()});
    }


    updateTypeLevelRange(items) {
        let endpoint = `${config.baseUrl + config.skillTypeLevelEndpoint}/update`;
        return axios
            .post(endpoint, items, {headers: this.getHeader()});
    }

}

class RolesApi extends ApiBase {
    constructor(props) {
        super(props);
    }

    getAll() {
        let endpoint = config.baseUrl + config.roleLevelEndpoint;
        return axios.get(endpoint, {headers: this.getHeader()});
    }

    getAllTypes() {
        let endpoint = config.baseUrl + config.roleTypeEndpoint;
        return axios.get(endpoint, {headers: this.getHeader()});
    }

    updateRange(items) {
        let endpoint = `${config.baseUrl + config.roleLevelEndpoint}/update`;
        return axios.post(endpoint, items, {headers: this.getHeader()});
    }

    updateTypeRange(items) {
        let endpoint = `${config.baseUrl + config.roleTypeEndpoint}/update`;
        return axios.post(endpoint, items, {headers: this.getHeader()});

    }
}

class RoleLevelRulesApi extends ApiBase {
    constructor(token) {
        super(token);
    }

    getAll() {
        let endpoint = config.baseUrl + config.roleLevelRuleEndpoint;
        return axios.get(endpoint, {headers: this.getHeader()});
    }

    updateRange(items) {
        let endpoint = `${config.baseUrl + config.roleLevelRuleEndpoint}/update`;
        return axios.post(endpoint, items, {headers: this.getHeader()});
    }
}


class UserSkillApi extends ApiBase {
    constructor(t) {
        super(t);
    }

    getByUser(username) {
        let endpoint = config.baseUrl + config.userSkillEndpoint + "/" + username;
        return axios.get(endpoint, {headers: this.getHeader()});
    }

    setUserSkill(userSkill) {
        let endpoint = `${config.baseUrl + config.userSkillEndpoint}`;
        return axios.post(endpoint, userSkill, {headers: this.getHeader()});
    }

    updateRange(items) {
        let endpoint = `${config.baseUrl + config.userSkillEndpoint}/update`;
        return axios.post(endpoint, items, {headers: this.getHeader()});
    }
}

export default class Api {
    constructor() {
        this.token = null;
        this.authService = new MSALAuthService();
    }

    setToken(val) {
        this.token = val;
    }

    initialize() {
        let instance = this;
        return new Promise((res, rej) => {
            this.authService.getOrAcquireSilently().then(result => {
                if (result.idToken.expiration < Date.now())
                    instance.setToken(result.idToken.rawIdToken);
                res(instance);
            });
        });
    }

    User() {
        return new UserApi(this.token);
    }

    Skill() {
        return new SkillsApi(this.token);
    }

    Role() {
        return new RolesApi(this.token);
    }

    RoleLevelRule() {
        return new RoleLevelRulesApi(this.token);
    }

    UserSkill() {
        return new UserSkillApi(this.token);
    }

};


