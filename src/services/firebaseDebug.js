import firebase from 'firebase';
import 'firebase/firestore';
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

    store.commit('setUsers', tempArray);
}); // skill groups

fbskillGroupsCollection.onSnapshot(qs => {
    let tempArray = {};

    qs.forEach(doc => {
        let user = doc.data();
        tempArray[doc.id] = user;
    });

    store.commit('setSkillGroups', tempArray);
});


fbrolesCollection.onSnapshot(qs => {
    let tempArray = {};

    qs.forEach(doc => {
        let user = doc.data();
        tempArray[doc.id] = user;
    });

    store.commit('setRoles', tempArray);
});

export {
    fbrolesCollection,
    fbskillGroupsCollection,
    fbskillLevelsCollection,
    fbskillsCollection
};
