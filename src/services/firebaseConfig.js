import authentication from '../authentication';
import store from '../store';
import api from './apiConfig';


let dbCollection = function dbCollection(collectionType) {
    this.collectionType = collectionType;
};
const db = {
    collection: function (dataType) {
        console.log("requested " + dataType);
        return new dbCollection(dataType);
    }
};

let backendQuery = function backendQuery(query, apiCall) {
    this.query = query;
    this.apiCall = apiCall;
};

dbCollection.prototype.doc = function docRef(value) {
    console.log("reaching for " + value + " of type " + this.collectionType);
    if (this.collectionType === 'users') {
        return new backendQuery(value, api.User.get);
    } else {
        return new backendQuery(value);
    }
};

backendQuery.prototype.get = function () {
    console.log("getting this " + this.query);

    return this.apiCall(this.query);
};

backendQuery.prototype.get1 = function () {
    console.log("getting this" + this.query);
};

var dataThing = function (name) {
    this.name = name;
};

dataThing.prototype.data = function () {
    return {name: this.name};
};

const usersCollection = db.collection('users');
const rolesCollection = db.collection('roles');
const skillGroupsCollection = db.collection('skill_groups');
const skillLevelsCollection = db.collection('skill_levels');
const skillsCollection = db.collection('skills');

const auth = authentication.authenticationContext;

const currentUser = function () {
    return store.state.currentUser;
};

authentication.initialize().then((u) => {
    store.commit('setCurrentUser', authentication.getUserProfile());
    store.dispatch('fetchUserProfile');
});

export {
    db,
    auth,
    currentUser,
    usersCollection,
    rolesCollection,
    skillGroupsCollection,
    skillLevelsCollection,
    skillsCollection
};
