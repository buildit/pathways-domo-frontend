import Vue from 'vue';
import Router from 'vue-router';
import UserDetail from "./views/UserDetail";

import Login from "./views/Login";
import Settings from "./views/Settings";
import DBLinkage from "./dbSetup_reference/DBLinkage";
import CSVParse from "./dbSetup_reference/CSVParse";
import EditGroups from "./views/EditGroups";
import Home from "./views/Home";
import SkillsBreakdown from "./views/SkillsBreakdown";
import Debug from "./views/Debug";
import Bench from "./views/Bench";
import Tools from "./views/Tools";
import Assessments from './views/Assessments';
import OEditGoals from "./components/organisms/o-editGoals";
import OEditSkills from "./components/organisms/o-editSkills";
import TribeVerListing from "./components/molecules/m-tribeVerListing";

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '*',
            redirect: '/debug'
        },
        {
            path: '/dashboard',
            name: 'Home',
            component: Home,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/bench',
            name: 'Bench',
            component: Bench,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/assessments',
            name: 'Assessments',
            component: Assessments,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/tools',
            name: 'Tools',
            component: Tools,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/debug',
            name: 'Debug',
            component: Debug,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/settings',
            name: 'Settings',
            component: Settings,
            meta: {
                requiresAuth: true
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
                        requiresAuth: true
                    }
                },
                {
                    name: 'Skills',
                    path: 'skills',
                    component: OEditSkills,
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    name: 'TribeVerification',
                    path: 'tribeverification',
                    component: TribeVerListing,
                    meta: {
                        requiresAuth: true
                    }
                }
            ]
        },
        {
            path: '/skillsbreakdown',
            name: 'SkillsBreakdown',
            component: SkillsBreakdown,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/editgroups',
            name: 'EditGroups',
            component: EditGroups,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/db2',
            name: 'DBLinkage',
            component: DBLinkage,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/db',
            name: 'CSVParse',
            component: CSVParse,
            meta: {
                requiresAuth: true
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

    if (to.matched.some(record => record.meta.requiresAuthentication)) {
        if ($adal.isAuthenticated()) {
            this.$store.commit('setCurrentUser', AuthenticationContext.user);
            next();
        } else {
            AuthenticationContext.login();
        }
    } else {
        next();
    }
});

export default router;
