import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import api from './services/apiConfig';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        currentUser: null,
        userProfile: {},
        userRoles: null,
        skillGroups: {},
        skillGroupSkills: {},
        skills: {},
        skillLevels: [],
        roles: [],
        roleLevelRules: [],
        users: {},
        accessToken: localStorage.getItem('user-accessToken') || '',
        accessTokenStatus: '',
        datasetList: [],
        apiData: [],
        apiCallStatus: 200,
        domoTokenAttempts: 0,
        // Temp for debug
        fbroles: [],
        fbusers: [],
        fbskillGroups: [],
        fbskillLevels: [],
        fbskills: [],
    },
    getters: {
        qualifiedUsersBySkillGroup: state => {
            let qualifiedUsersBySkillGroup = {};

            if (
                Object.keys(state.skillGroups).length === 0 ||
                Object.keys(state.userProfile).length === 0
            ) {
                return qualifiedUsersBySkillGroup;
            }

            for (let sg_id in state.skillGroups) {
                qualifiedUsersBySkillGroup[sg_id] = {
                    group_name: state.skillGroups[sg_id]['name'],
                    title: state.skillGroups[sg_id]['title'],
                    users: {}
                };
            } // populate each skill group object regardless

            for (let u_id in state.users) {
                const currentUser = state.users[u_id];

                for (let sg_id in currentUser['roles']) {
                    if (currentUser['roles'][sg_id]['level'] > 0) {
                        qualifiedUsersBySkillGroup[sg_id]['users'][u_id] = {
                            level: currentUser['roles'][sg_id]['level'],
                            level_name: currentUser['roles'][sg_id]['level_name'],
                            user_first_name: currentUser['user_first_name'],
                            user_last_name: currentUser['user_last_name'],
                            user_id: u_id
                        };
                    } // if user role is more than n/a level
                } // loop thru each role
            } // loop thru each user

            return qualifiedUsersBySkillGroup;
        },
        qualifiedUsersBySkill: state => {
            let qualifiedUsersBySkill = {};

            if (
                Object.keys(state.skillGroups).length === 0 ||
                Object.keys(state.userProfile).length === 0
            ) {
                return qualifiedUsersBySkill;
            }

            for (let sg_id in state.skillGroups) {
                qualifiedUsersBySkill[sg_id] = {
                    group_name: state.skillGroups[sg_id]['name'],
                    skills: {}
                };
            } // populate each skill group object regardless

            for (let u_id in state.users) {
                const currentUser = state.users[u_id];

                for (let s_id in currentUser['skills']) {
                    if (currentUser['skills'][s_id]['level'] > 0) {
                        const sg_id = currentUser['skills'][s_id]['sg_id'];

                        if (!qualifiedUsersBySkill[sg_id]['skills'][s_id]) {
                            qualifiedUsersBySkill[sg_id]['skills'][s_id] = {
                                skill_name: currentUser['skills'][s_id]['skill_name'],
                                users: {}
                            };
                        } // if this skill object is empty

                        const skill_slot = qualifiedUsersBySkill[sg_id]['skills'][s_id]['users'];

                        skill_slot[u_id] = {
                            level: currentUser['skills'][s_id]['level'],
                            level_name: currentUser['skills'][s_id]['level_name'],
                            user_first_name: currentUser['user_first_name'],
                            user_last_name: currentUser['user_last_name'],
                            user_id: u_id
                        };
                    } // if user user skill > 0
                } // loop thru user skills
            } // loop thru users

            // console.log('//', qualifiedUsersBySkill);

            return qualifiedUsersBySkill;
        },
        userGoals: state => {
            let skillsCollection = {};

            for (let s_id in state.userProfile.userSkills) {
                if (state.userProfile.userSkills[s_id]['level_goal']) {
                    let progressCompleted = state.userProfile.userSkills[s_id]['level'] / state.userProfile.userSkills[s_id]['level_goal']['level'];
                    let role_name = state.userProfile.skills[s_id]['level_goal']['name'];

                    if (progressCompleted === 1) {
                        role_name = "Finished";
                    }
                    skillsCollection[s_id] = {
                        title: state.userProfile.skills[s_id]['skill_name'],
                        role_name: role_name,
                        progressCompleted: progressCompleted
                    };
                }
            }

            return skillsCollection;
        }
    },
    actions: {
        clearData({commit}) {
            commit('setCurrentUser', null);
            commit('setUserProfile', {});
            commit('setSkillGroups', null);
        },
        fetchUserProfile({commit, state}) {
            api.User.get(state.currentUser.email).then(res => {

                console.log('committing ' + res.data.username);
                if (res.data.directoryName == null) {
                    res.data.directoryName = state.currentUser.name;
                    res.data.name = state.currentUser.name.replace(' (Digital)', '');
                    store.dispatch('updateProfile', res.data);
                }

                commit('setUserProfile', res.data);

                if (res.data != null) {
                    store.dispatch('fetchAllData', res).then(res => {
                        console.log("finished running fetchalldata");
                    });
                }
            }).catch(err => {
                console.log(err);
            });
            return null;
        },
        updateProfile({commit, state}, data) {
            api.User.update(data).then(user => {
                console.log('User profile updated.');
            }).catch(err => {
                console.log(err);
            });
        },
        updateUserRoleLevels({commit, state}) {
            let newRoleLevels = {};
            for (let sg_id in state.skillGroups) {
                const currentGroup = state.skillGroups[sg_id];

                newRoleLevels[sg_id] = {
                    title: currentGroup['title'],
                    level: 0,
                    level_name: state.roles[0]['name'],
                    targetTracking: {},
                    group_name: currentGroup['name']
                };

                for (let i = 0; i < state.roles.length; i++) {
                    const currentRole = state.roles[i];
                    const r_id = currentRole['r_id'];
                    const skillsInRoleCollection = currentGroup['roles'][r_id]['skills'];

                    newRoleLevels[sg_id]['targetTracking'][r_id] = {
                        total: 0,
                        userPoints: 0,
                        role_name: currentRole['name'],
                    };

                    let numberOfSkillsNeeded = 0;
                    let skillsMet = 0;

                    for (let s_id in skillsInRoleCollection) {
                        let currentUserSkillLevel = 0;
                        let requiredSkillLevel = currentGroup['roles'][r_id]['skills'][s_id]['level'];

                        if (currentGroup['skills'][s_id]['required'] === true) {
                            if (state.userProfile.skills[s_id]) {
                                currentUserSkillLevel = state.userProfile.skills[s_id]['level'];


                                if (currentUserSkillLevel >= requiredSkillLevel) {
                                    skillsMet++;
                                    newRoleLevels[sg_id]['targetTracking'][r_id]['userPoints'] += Math.min(currentUserSkillLevel, requiredSkillLevel);

                                } // if the user meets set level

                            } else {
                                if (requiredSkillLevel === 0) {
                                    skillsMet++;
                                }
                            }  // if user has skill or not


                            numberOfSkillsNeeded++;
                            newRoleLevels[sg_id]['targetTracking'][r_id]['total'] += requiredSkillLevel;
                        } // if required as a skill
                    } // for loop skills

                    if (skillsMet === numberOfSkillsNeeded) {
                        newRoleLevels[sg_id]['level'] = currentRole['level'];
                        newRoleLevels[sg_id]['level_name'] = currentRole['name'];
                    } // if hit the criteria
                } // for roles
            }
            fb.usersCollection.doc(state.currentUser.uid).set({
                roles: newRoleLevels
            }, {
                merge: true
            }).then(ref => {
                store.dispatch('fetchUserProfile');
            }).catch(err => {
                console.log(err);
            });
        },

        fetchAllData({commit, state}, user) {
            const usersRequest = api.User.getAll().then(res => {
                store.commit('setUsers', res.data);
            });

            const rolesRequest = api.Role.getAll().then(res => {
                store.commit('setRoles', res.data);
            });

            const skillGroupRequest = api.Role.getAllTypes().then(res => {
                store.commit('setSkillGroups', res.data);
            });

            const skillsRequest = api.Skill.getAll().then(res => {
                store.commit('setSkills', res.data);
            });

            const skillLevelsRequest = api.Skill.getAllLevels().then(res => {
                store.commit('setSkillLevels', res.data);
            });

            const rulesRequest = api.RoleLevelRule.getAll().then(res => {
                store.commit('setRoleLevelRules', res.data);
                store.dispatch('setUserRoles', res.data);
            });

            Promise.all([usersRequest, rolesRequest, skillGroupRequest, skillsRequest, skillLevelsRequest])
                .then(() => {
                    return rulesRequest;
                });
        },

        setUserRoles({commit, state}, data) {
            let skillset = state.userProfile.userSkills;
            let rules = state.roleLevelRules;
            let userRoles = {};
            let rulesMap = {};

            let skillGroupSkillSet = {};

            // break down rule set into roles
            data.forEach(function (r) {
                if (rulesMap[r.roleTypeId] == null) {
                    rulesMap[r.roleTypeId] = {
                        rLevels: {},
                    };
                }

                if (rulesMap[r.roleTypeId].rLevels[r.roleLevelId] == null) {
                    rulesMap[r.roleTypeId].rLevels[r.roleLevelId] = [];
                }

                if (skillGroupSkillSet[r.roleTypeId] == null) {
                    skillGroupSkillSet[r.roleTypeId] = {skills: new Set()};
                }

                skillGroupSkillSet[r.roleTypeId].skills.add(state.skills.find(s => s.id === r.skillTypeId));

                rulesMap[r.roleTypeId].rLevels[r.roleLevelId].push({type: r.skillTypeId, level: r.skillLevelId});

            });


            state.skillGroups.forEach(sg => {
                userRoles[sg.id] = state.roles.find(r => r.level === 0);
            });

            state.roles.forEach(r => {

            });

            state.skillGroups.forEach(sg => {
                let mappedRoles = [];
                if (!skillset.includes(s => s.skillTypeId === rm.skillTypeId)) {
                    mappedRoles.push();
                } else {

                }
                userRoles[sg.id] = mappedRoles;
            });

            store.commit('setSkillGroupSkills', skillGroupSkillSet);
            store.commit('setUserRoles', userRoles);
        },

        // Stuff I'm not using
        requestAccessToken({commit, dispatch}) {
            // TODO: Backend Request
        },
        getDatasetList({commit, state, dispatch}, listOffset = 0) {
            return new Promise((resolve, reject) => {

                const config = {
                    url: 'https://api.domo.com/v1/datasets',
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': state.accessToken
                    },
                    params: {
                        'offset': listOffset,
                        'limit': 50
                    }
                };

                let tempArray = [];
                if (state.apiCallStatus === 'Loading') {
                    tempArray = state.datasetList;
                }

                commit('setAPICallStatus', 'Loading');

                axios(config)
                    .then(response => {


                        if (response.status === 200) {
                            if (response.data.length > 0) {
                                for (let i = 0; i < response.data.length; i++) {
                                    tempArray.push(response.data[i]);
                                }

                                listOffset += 51;

                                commit('setDatasetList', tempArray);

                                dispatch('getDatasetList', listOffset);
                            } else {
                                commit('setAPICallStatus', 200);
                            }

                            resolve(response);

                        }


                    })
                    .catch(e => {
                        reject(e);
                        commit('setAPICallStatus', e);

                    });


            });
        },
        makeDOMOCall({commit, state, dispatch}, settings = {
            method: 'get',
            call: 'datasets',
            id: 'fd2a9bc6-4ed2-4e18-81c1-86a8ffcc06e7',
            params: {},
            data: ''
        }) {
            return new Promise((resolve, reject) => {
                const config = {
                    url: 'https://api.domo.com/v1/' + settings.call + '/' + settings.id,
                    method: settings.method,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': state.accessToken
                    },
                    params: settings.params,
                    data: settings.data
                };


                axios(config)
                    .then(response => {

                        if (response.status === 200) {

                            console.log('api = 200', response);


                            commit('setAPIData', response.data);
                            commit('setAPICallStatus', response.status);
                            resolve(response);

                        }

                    })
                    .catch(e => {


                        commit('setAPICallStatus', e);
                        reject(e);


                    });
            });
        }
    },
    mutations: {
        setCurrentUser(state, val) {
            state.currentUser = val;
        },
        setUserProfile(state, val) {
            state.userProfile = val;
        },
        setUserRoles(state, val) {
            if (val) {
                state.userRoles = val;
            } else {
                state.userRoles = {};
            }
        },
        setSkillGroups(state, val) {
            if (val) {
                state.skillGroups = val;
            } else {
                state.skillGroups = {};
            }
        },
        setSkills(state, val) {
            if (val) {
                state.skills = val;
            } else {
                state.skills = {};
            }
        },
        setSkillGroupLinkages(state, val) {
            if (val) {
                state.skillGroupLinkages = val;
            } else {
                state.skillGroupLinkages = [];
            }
        },
        setSkillLevels(state, val) {
            if (val) {
                state.skillLevels = val;
            } else {
                state.skillLevels = [];
            }
        },
        setRoles(state, val) {
            if (val) {
                state.roles = val;
            } else {
                state.roles = [];
            }
        },
        setUsers(state, val) {
            if (val) {
                state.users = val;
            } else {
                state.users = [];
            }
        },
        setToken(state, val) {
            if (val) {
                state.token = val;
            } else {
                state.token = '';
            }
        },
        setDomoTokenAttempts(state, val) {
            if (val) {
                state.token = val;
            } else {
                state.token = 0;
            }
        },
        setAccessTokenStatus(state, val) {
            if (val) {
                state.accessTokenStatus = val;
            } else {
                state.accessTokenStatus = '';
            }
        },
        setAPIData(state, val) {
            if (val) {
                state.apiData = val;
            } else {
                state.apiData = [];
            }
        },
        setDatasetList(state, val) {
            if (val) {
                state.datasetList = val;
            } else {
                state.datasetList = [];
            }
        },
        setAPICallStatus(state, val) {
            if (val) {
                state.apiCallStatus = val;
            } else {
                state.apiCallStatus = '';
            }
        },
        setRoleLevelRules(state, val) {
            if (val) {
                state.roleLevelRules = val;
            } else {
                state.roleLevelRules = [];
            }
        },
        setSkillGroupSkills(state, val) {
            if (val) {
                state.skillGroupSkills = val;
            } else {
                state.skillGroupSkills = [];
            }
        },
    }
});

export default store;
