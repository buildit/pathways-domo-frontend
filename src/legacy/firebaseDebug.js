import firebase from 'firebase';
import store from '../store';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyA4gu9dKjMhKv9afME2iMyIAFgU8oEamEk",
    authDomain: "pathways-skills.firebaseapp.com",
    databaseURL: "https://pathways-skills.firebaseio.com",
    projectId: "pathways-skills",
    storageBucket: "pathways-skills.appspot.com",
    messagingSenderId: "746111519781"
};
firebase.initializeApp(config);

// firebase utils
const fbdb = firebase.firestore();


// firebase collections
const fbusersCollection = fbdb.collection('users');
const fbrolesCollection = fbdb.collection('roles');
const fbskillGroupsCollection = fbdb.collection('skill_groups');
const fbskillLevelsCollection = fbdb.collection('skill_levels');
const fbskillsCollection = fbdb.collection('skills');

fbusersCollection.onSnapshot(querySnapshot => {
    let tempArray = {};

    querySnapshot.forEach(doc => {
        let user = doc.data();
        tempArray[doc.id] = user;
    });

    store.commit('setfbUsers', tempArray);
}); // skill groups

fbskillGroupsCollection.onSnapshot(qs => {
    let tempArray = {};

    qs.forEach(doc => {
        let user = doc.data();
        tempArray[doc.id] = user;
    });

    store.commit('setfbSkillGroups', tempArray);
});

fbrolesCollection.onSnapshot(qs => {
    let tempArray = {};

    qs.forEach(doc => {
        let user = doc.data();
        tempArray[doc.id] = user;
    });

    store.commit('setfbRoles', tempArray);
});

fbskillsCollection.onSnapshot(querySnapshot => {
    let tempArray = {};

    querySnapshot.forEach(doc => {
        let post = doc.data();
        tempArray[doc.id] = post;
    });

    store.commit('setfbSkills', tempArray);
}); // skills

fbskillLevelsCollection.orderBy('level', 'asc').onSnapshot(querySnapshot => {
    let tempArray = [];

    querySnapshot.forEach(doc => {
        let post = doc.data();
        post.sl_id = doc.id;

        tempArray.push(post);
    });

    store.commit('setfbSkillLevels', tempArray);
});

fbrolesCollection.orderBy('level', 'asc').onSnapshot(querySnapshot => {
    let tempArray = [];

    querySnapshot.forEach(doc => {
        let post = doc.data();
        post.r_id = doc.id;

        tempArray.push(post);

    });

    store.commit('setfbRoles', tempArray);
}); // roles

export {
    fbusersCollection,
    fbrolesCollection,
    fbskillGroupsCollection,
    fbskillLevelsCollection,
    fbskillsCollection
};
