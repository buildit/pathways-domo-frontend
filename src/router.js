import Vue from 'vue';
import Router from 'vue-router';
import UserDetail from "./views/UserDetail";

import Settings from "./views/Settings";
import DBLinkage from "./dbSetup_reference/DBLinkage";
import CSVParse from "./dbSetup_reference/CSVParse";
import EditGroups from "./views/EditGroups";
import Home from "./views/Home";
import SkillsBreakdown from "./views/SkillsBreakdown";
import Bench from "./views/Bench";
import Tools from "./views/Tools";
import Assessments from './views/Assessments';
import OEditGoals from "./components/organisms/o-editGoals";
import OEditSkills from "./components/organisms/o-editSkills";
import TribeVerListing from "./components/molecules/m-tribeVerListing";
import authentication from './authentication';
import store from './store';

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
        /*{
            path: '/debug',
            name: 'Debug',
            component: Debug,
            meta: {
                requireAuth: true
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },*/
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
        },
        {
            path: '/db2',
            name: 'DBLinkage',
            component: DBLinkage,
            meta: {
                requireAuth: true
            }
        },
        {
            path: '/db',
            name: 'CSVParse',
            component: CSVParse,
            meta: {
                requireAuth: true
            }
        }

    ]
});

router.beforeEach((to, from, next) => {
    // const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
    //const currentUser = firebase.auth().currentUser;

    // if (requiresAuth && !currentUser) {
    //   next('/login');
    // } else if (requiresAuth && currentUser) {
    //   next();
    // } else {
    //   next();
    // }

    if (to.matched.some(record => record.meta.requireAuth)) {
        if (authentication.isAuthenticated()) {
            // store.commit('setCurrentUser', authentication.getUser());
            next();
        } else {
            authentication.signIn();
        }
    } else {
        next();
    }
});

export default router;
