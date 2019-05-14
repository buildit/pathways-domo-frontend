<template>
    <div class="m-navbar__container  ">
        <div v-if="!isNavOpen">
            <button class="m-navbar__openPanelButton" @click.prevent="setNavPanelState(true)">
                Menu
            </button>
        </div>
        <div v-else class="m-navbar__listWrapper ">
            <ul class="p-0 m-0">
                <li>
                    <router-link to="/dashboard" @click.native="checkToClosePanel">
                        Home
                    </router-link>
                </li>
                <li>
                    <router-link to="/user/skills" @click.native="checkToClosePanel">
                        Self-Assessment
                    </router-link>
                </li>
                <li>
                    <router-link to="/user/goals" @click.native="checkToClosePanel">
                        Set Goals
                    </router-link>
                </li>
                <li>
                    <router-link to="/user/tribeverification" @click.native="checkToClosePanel">
                        Tribe Verification
                    </router-link>
                </li>
                <li>
                    <router-link to="/skillsbreakdown" @click.native="checkToClosePanel">
                        Expertise Lookup
                    </router-link>
                </li>
                <li v-if="currentUser.uid === 'pl1uHimMZ3YnSzqe5ExgCcLuo1J2'">
                    <router-link to="/editgroups" @click.native="checkToClosePanel">
                        Edit Groups
                    </router-link>
                </li>
                <li v-if="currentUser.uid === 'pl1uHimMZ3YnSzqe5ExgCcLuo1J2'">
                    <router-link to="/debug" @click.native="checkToClosePanel">
                        Debug
                    </router-link>
                </li>
                <li v-if="currentUser.uid === 'pl1uHimMZ3YnSzqe5ExgCcLuo1J2'">
                    <router-link to="/tools" @click.native="checkToClosePanel">
                        Linkedin / Tools
                    </router-link>
                </li>
                <li>
                    <router-link to="/bench" @click.native="checkToClosePanel">
                        Bench Status
                    </router-link>
                </li>
                <li><a @click="logout">Logout</a></li>
            </ul>
        </div>
    </div>
</template>
<script>
    import {mapState} from 'vuex';

    export default {
        name: "MNavbar",
        props: {
            isNavOpen: Boolean
        },
        computed: {
            ...mapState(['userProfile', 'currentUser'])
        },
        methods: {
            setNavPanelState: function (state) {
                this.$emit('setNavPanelState', state);
            },
            checkToClosePanel: function () {
                if (window.innerWidth < 1024) {
                    this.$emit('setNavPanelState', false);
                }
            },
            logout: function () {
                this.checkToClosePanel();
                $adal.signOut();
                fb.auth.signOut().then(() => {
                    this.$store.dispatch('clearData');
                    this.$router.push('/login');
                }).catch(err => {
                    console.log(err);
                });
            }
        }
    };
</script>
<style scoped lang="scss">
    @import "@/styles/main.scss";

    .m-navbar {

        &__listWrapper {
            margin: space(4) 0;

            ul {
                list-style: none;

                li {
                    a,
                    a:not([href]) {
                        color: $white;
                        padding: space(2) space(4);

                        &:hover {
                            @include deepShadow(4, colorViz(0), 5%);
                            color: $white;
                        }
                    }


                }
            }
        }

        &__openPanelButton {
            @include deepShadow(8, colorViz(6), 15%);
            border-radius: 2rem;
            color: $white;
            cursor: pointer;
            display: block;
            font-weight: bold;
            margin: space(4) 0 0 space(4);
            padding: space(3) space(2);
            position: fixed;
            z-index: $zindex-fixed;

            &:active {
                @include buttonshadowActive(colorViz(6), 15%);
            }
        }

    }
</style>
