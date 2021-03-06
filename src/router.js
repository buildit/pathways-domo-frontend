import Vue from 'vue';
import Router from 'vue-router';
import UserDetail from "./views/UserDetail";
import Settings from "./views/Settings";
import EditGroups from "./views/EditGroups";
import Home from "./views/Home";
import SkillsBreakdown from "./views/SkillsBreakdown";
import Bench from "./views/Bench";
import Tools from "./views/Tools";
import Assessments from './views/Assessments';
import OEditGoals from "./components/organisms/o-editGoals";
import OEditSkills from "./components/organisms/o-editSkills";
import TribeVerListing from "./components/molecules/m-tribeVerListing";
import MSALAuthService from './authentication';
import store from "./store";

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '*',
            redirect: '/dashboard'
        },
        {
            path: '/dashboard',
            name: 'Home',
            component: Home,
            meta: {
                requireAuth: true
            }
        },
        {
            path: '/bench',
            name: 'Bench',
            component: Bench,
            meta: {
                requireAuth: true
            }
        },
        {
            path: '/assessments',
            name: 'Assessments',
            component: Assessments,
            meta: {
                requireAuth: true
            }
        },
        {
            path: '/tools',
            name: 'Tools',
            component: Tools,
            meta: {
                requireAuth: true
            }
        },
        {
            path: '/settings',
            name: 'Settings',
            component: Settings,
            meta: {
                requireAuth: true
            }
        },
        {
            path: '/user/:id',
            component: UserDetail,
            children: [
                {
                    name: 'Goals',
                    path: 'goals',
                    component: OEditGoals,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    name: 'Skills',
                    path: 'skills',
                    component: OEditSkills,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    name: 'TribeVerification',
                    path: 'tribeverification',
                    component: TribeVerListing,
                    meta: {
                        requireAuth: true
                    }
                }
            ]
        },
        {
            path: '/skillsbreakdown',
            name: 'SkillsBreakdown',
            component: SkillsBreakdown,
            meta: {
                requireAuth: true
            }
        },
        {
            path: '/editgroups',
            name: 'EditGroups',
            component: EditGroups,
            meta: {
                requireAuth: true
            }
        }
    ]
});

let mService = new MSALAuthService();
let myStore = store;
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth)) {

        if (myStore.state.currentUser) {
            console.log(`have current user: ${store.state.currentUser}`);
            next();
        } else if (mService.getAccount()) {
            console.log(`have account but no user: ${mService.getAccount()}`);
            mService.goGraph().then((result) => {
                    myStore.commit('setCurrentUser', result.data);
                    myStore.dispatch('fetchUserProfile');
                    next();
                })
                .catch(err => {
                    console.log(`error making graph call ${err}`);
                    mService.logOut();
                    mService.login();
                });
        } else {
            console.log(`complete failure`);
            console.log('not authorized.');
        }
    } else {
        next();
    }
});

export default router;
