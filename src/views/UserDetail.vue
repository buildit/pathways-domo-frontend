<template>
    <div class="container">
        <div class="m-userDetail__wrapper p-4">
            <div class="row">
                <div id="m-userDetail__sidebar" class="col-12 col-lg-3">
                    <div class="m-userDetail__sidebarPanels">
                        <div class="m-userDetail__sidebarProfile  -cardSidebar p-4">
                            <h2 v-if="userProfile">
                                {{ fullName }}
                            </h2>
                            <p v-if="userProfile">
                                Forecast ID: {{ userProfile.domoIdentifier }}
                            </p>
                            <o-user-role-breakdown></o-user-role-breakdown>
                        </div>

                        <div v-if="$route.params.id==='skills'" class="m-userDetail__sidebarRoleProgress -cardSidebar my-4 p-4">
                            <h2>Role Progress</h2>
                            <m-user-role-completion v-bind:listOfItems="nextRoleLevels" v-bind:showEmpty="false"></m-user-role-completion>
                        </div>

                        <div v-if="$route.params.id==='goals'" class="m-userDetail__sidebarRoleProgress  -cardSidebar my-4 p-4">
                            <h2>Goals Progress</h2>

                            <m-user-role-completion v-bind:listOfItems="userGoals" v-bind:showEmpty="true"></m-user-role-completion>
                        </div>

                        <div v-if="$route.params.id==='tribeverification'" class="m-userDetail__sidebarRoleProgress  -cardSidebar my-4 p-4">
                            <h2>Fake Meta</h2>

                            <h3> Wipro Band</h3>

                            <p>XX</p>

                            <h3>Manager</h3>

                            <p>Jane Doe</p>

                            <h3> Next Band Reassessment</h3>
                            <p> Dec 15, 2019</p>
                        </div>
                    </div>
                </div>

                <div class=" col-12 col-lg-9">
                    <o-edit-skills v-if="$route.params.id==='skills'" v-bind:nextRoleLevels="nextRoleLevels" @setHelpPanelContent="setHelpPanelContent" @setLoadingState="setLoadingState"></o-edit-skills>

                    <o-edit-goals v-if="$route.params.id==='goals'" @setLoadingState="setLoadingState"></o-edit-goals>

                    <tribe-ver-listing v-if="$route.params.id==='tribeverification'" @setLoadingState="setLoadingState"></tribe-ver-listing>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapState} from 'vuex';
    import OUserRoleBreakdown from "../components/organisms/o-userRoleBreakdown";
    import MUserRoleCompletion from "../components/molecules/m-userRoleCompletion";
    import OEditSkills from "../components/organisms/o-editSkills";
    import OEditGoals from "../components/organisms/o-editGoals";
    import TribeVerListing from '../components/molecules/m-tribeVerListing';

    export default {
        components: {
            OEditSkills,
            OEditGoals,
            MUserRoleCompletion,
            OUserRoleBreakdown,
            TribeVerListing
        },

        filters: {},
        data() {
            return {};
        },
        computed: {
            ...mapState([
                'userProfile',
                'currentUser',
                'skillGroups',
                'skills',
                'skillLevels',
                'roles'
            ]),
            ...mapGetters([
                'userGoals'
            ]),
            fullName: function () {
                if (this.currentUser != null && this.currentUser.profile != null) {
                    return this.currentUser.profile.name;
                }

                return null;
            },
            nextRoleLevels: function () {
                let nextRoleLevels = {};


                // console.log(this.roleLevels)
                for (let sg_id in this.skillGroups) {
                    if (this.userProfile.roles[sg_id]) {
                        if (this.userProfile.roles == null) {
                            console.error(`Catastrophy! Could not fetch roles for user {this.userProfile.username}`);
                            break;
                        }
                        const thisLevel = this.userProfile.roles[sg_id];

                        if (thisLevel.level < this.roles.length - 1) {
                            const nextLevel = parseInt(thisLevel.level) + 1;

                            const r_id = this.roles[nextLevel]['r_id'];

                            const totalFromNextLevel = this.userProfile.roles[sg_id]['targetTracking'][r_id]['total'];
                            const userCurrentLevelTotal = this.userProfile.roles[sg_id]['targetTracking'][r_id]['userPoints'];
                            const progressAway = (userCurrentLevelTotal > 0) ? userCurrentLevelTotal / totalFromNextLevel : 0;

                            nextRoleLevels[sg_id] = {};

                            nextRoleLevels[sg_id]['role_name'] = this.roles[nextLevel]['name'];
                            nextRoleLevels[sg_id]['progressCompleted'] = progressAway;
                            nextRoleLevels[sg_id]['group_name'] = this.skillGroups[sg_id]['name'];
                            nextRoleLevels[sg_id]['title'] = this.skillGroups[sg_id]['title'];

                            // loop thru roles
                            // compare each with
                        } else {
                            nextRoleLevels[sg_id] = false;
                        } // check if user is already maxed out
                    } // if group exists in roleLevels. it should though...
                } // for skill groups


                return nextRoleLevels;
            }
        },
        created: function () {

        },
        mounted: function () {

        },
        methods: {
            setHelpPanelState(state) {
                this.$emit('setHelpPanelState', state);
            },
            setHelpPanelContent(e) {
                this.$emit('setHelpPanelContent', e);
            },
            setLoadingState(e) {
                this.$emit('setLoadingState', e);
            }
        }
    };
</script>


<style scoped lang="scss">
    @import "@/styles/main.scss";


    .m-userDetail {
        &__wrapper {

        }

        &__helperPanel {
            &.hidden {
                display: none;
            }
        }

        &__sidebar {
            margin-bottom: space(4);
        }

        &__sidebarPanels {
            position: -webkit-sticky;
            position: sticky;
            top: 6.5rem;
            z-index: $zindex-sticky;
        }

        &__sidebarProfile {
            @include deepShadow(8, colorViz(4), 20%);
        }

        &__sidebarRoleProgress {
            @include deepShadow(8, colorViz(7), 22%);
        }


    }
</style>
