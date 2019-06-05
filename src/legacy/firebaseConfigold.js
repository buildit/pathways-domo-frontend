import firebase from 'firebase';
import 'firebase/firestore';

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
const db = firebase.firestore();
const auth = firebase.auth();
const currentUser = auth.currentUser;

// firebase collections
const usersCollection = db.collection('users');
const rolesCollection = db.collection('roles');
const skillGroupsCollection = db.collection('skill_groups');
const skillLevelsCollection = db.collection('skill_levels');
const skillsCollection = db.collection('skills');



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
