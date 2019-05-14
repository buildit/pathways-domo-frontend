import authentication from '../authentication';
import store from '../store';

const db = {
    collection: function (dataType) {
        console.log("requested " + dataType);
        return new dbCollection();
    }
};

var dbCollection = function dbCollection(collectionType) {
    this.collectionType = collectionType;
};

dbCollection.prototype.doc = function docRef(value) {
    console.log("reaching for " + value);
    return new backendQuery(value);
};

var backendQuery = function backendQuery(query) {
    this.query = query;
};

backendQuery.prototype.get = function () {
    console.log("getting this " + this.query);
    var newThing = "got " + this.query;

    return new Promise(function (res, rej) {
        res(new dataThing("Chrispydizzle"));
    });
};

backendQuery.prototype.get1 = function () {
    console.log("getting this" + this.query);
};

var dataThing = function(name) {
    this.name = name;
}

dataThing.prototype.data = function(){
    return { name: this.name }
}

const usersCollection = db.collection('users');
const rolesCollection = db.collection('roles');
const skillGroupsCollection = db.collection('skill_groups');
const skillLevelsCollection = db.collection('skill_levels');
const skillsCollection = db.collection('skills');

const auth = authentication.authenticationContext;
const currentUser = function() { return store.state.currentUser };
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
