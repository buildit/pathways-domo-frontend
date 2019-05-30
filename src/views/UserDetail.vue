<template>
  <div class="container">
    <div class="m-userDetail__wrapper p-4">
      <div class="row">
        <div id="m-userDetail__sidebar" class="col-12 col-lg-3">
          <div class="m-userDetail__sidebarPanels">
            <div class="m-userDetail__sidebarProfile  -cardSidebar p-4">
              <h2 v-if="userProfile">
                {{ userProfile.name }}
              </h2>
              <p v-if="userProfile">
                Forecast ID: {{ userProfile.domoIdentifier }}
              </p>
              <o-user-role-breakdown></o-user-role-breakdown>
            </div>

            <div v-if="$route.params.id==='skills'" class="m-userDetail__sidebarRoleProgress -cardSidebar my-4 p-4">
              <h2>Role Progress</h2>
                <m-user-role-completion v-bind:listOfItems="nextRoleLevels" v-bind:showEmpty="false" v-if="userRoles"></m-user-role-completion>
            </div>

            <div v-if="$route.params.id==='goals'" class="m-userDetail__sidebarRoleProgress  -cardSidebar my-4 p-4">
              <h2>Goals Progress</h2>

              <m-user-role-completion v-bind:listOfItems="userGoals" v-bind:showEmpty="true"></m-user-role-completion>
            </div>

            <div v-if="$route.params.id==='tribeverification'" class="m-userDetail__sidebarRoleProgress  -cardSidebar my-4 p-4">
              <h2>Fake Meta</h2>

                <h3>Wipro Band</h3>

              <p>XX</p>

              <h3>Manager</h3>

              <p>Jane Doe</p>

              <h3> Next Band Reassessment</h3>
              <p> Dec 15, 2019</p>
            </div>
          </div>
        </div>

        <div class=" col-12 col-lg-9">
            <o-edit-skills @setHelpPanelContent="setHelpPanelContent" @setLoadingState="setLoadingState" v-bind:nextRoleLevels="nextRoleLevels" v-if="$route.params.id==='skills' && userRoles"></o-edit-skills>

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
                'roles',
                'roleLevelRules',
                'userRoles',
                'skillGroupSkills'
            ]),
            ...mapGetters([
                'userGoals'
            ]),
            nextRoleLevels: function () {
                console.log(this.skillGroupSkills);
                let nextRoleLevels = {};
                for (let i = 0; i < this.skillGroups.length; i++) {
                    let sg = this.skillGroups[i];

                    if (this.userProfile.userSkills == null) {
                        console.error(`Catastrophy! Could not fetch skills for user {this.userProfile.username}`);
                        break;
                    }

                    if (this.roles.length === 0) break;
                    const thisLevel = this.userRoles[sg.id];
                    // const thisLevel = this.roles.find(r => r.level === 1);

                    if (thisLevel.level < Math.max.apply(Math, this.roles.map(function (o) {
                        return o.level;
                    }))) {
                        const nextLevel = parseInt(thisLevel.level) + 1;

                        // const r_id = this.roles.find[nextLevel]['r_id'];

                        //const totalFromNextLevel = this.userProfile.roles[sg_id]['targetTracking'][r_id]['total'];
                        //const userCurrentLevelTotal = this.userProfile.roles[sg_id]['targetTracking'][r_id]['userPoints'];
                        //const progressAway = (userCurrentLevelTotal > 0) ? userCurrentLevelTotal / totalFromNextLevel : 0;

                        const progressAway = .01;

                        nextRoleLevels[sg.id] = {};

                        nextRoleLevels[sg.id]['role_name'] = this.roles.find(r => r.level === nextLevel)['name'];
                        nextRoleLevels[sg.id]['progressCompleted'] = progressAway;
                        nextRoleLevels[sg.id]['group_name'] = sg['name'];
                        nextRoleLevels[sg.id]['title'] = sg['title'];

                        // loop thru roles
                        // compare each with
                    } else {
                        nextRoleLevels[sg.id] = false;
                    } // check if user is already maxed out
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
      top: 1.5rem;
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
