<template>
  <div class="">
    <div class="">
      <div class="o-profile__content">
        <div class="container">
          <div class="row">
            <div class="col-12 col-md-10 offset-md-1">
              <h1>Profile</h1>

              <form action="" class="o-profile__filterForm">
                <input type="text" v-model="searchTerm" placeholder="Search for">
                <input type="checkbox" v-model="showOnlyUserSkills" id="a-showOnlyUserSkills"> <label
                for="a-showOnlyUserSkills">Show only your skills</label>
              </form>


            </div>
          </div>
        </div>

        <template v-for="group in skillGroups">
          <div v-if="searchResults[group.id].skills.size > 0" class="o-profile__groupCard ">
            <div class="container">
              <div class="row">
                <div class="col-12 col-md-10 offset-md-1">
                  <div class="d-flex align-items-center">
                    <h2 class="o-profile__groupCardHeader">
                      {{group.name}}
                    </h2>
                    <a-help-button v-bind:id="group.id" v-bind:type="'group'"
                                   @setHelpPanelContent="setHelpPanelContent"></a-help-button>

                  </div>

                  <ul class="o-profile__skillList ">

                    <template v-for="skill in searchResults[group.id].skills">

                      <li class="o-profile__skillListItem d-md-flex justify-content-between align-items-end">

                        <div class="o-profile__skillListItemMeta d-flex justify-content-start align-items-center">
                          <h4 class="o-profile__skillListItemHeader ">
                            {{ skill.name }}
                          </h4>
                          <a-help-button v-bind:id="skill.id" v-bind:type="'skill'"
                                         class="o-profile__skillListButton"
                                         @setHelpPanelContent="setHelpPanelContent"></a-help-button>

                        </div>

                        <o-skill-level__panel v-bind:group="group" v-bind:group_key="group.id" v-bind:skill="skill"
                                              v-bind:skill_key="skill.id"></o-skill-level__panel>

                      </li>
                    </template>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </template>
      </div>
    </div>

  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import OSkillLevel__panel from "../components/organisms/o-skillLevel__panel";
  import AHelpButton from "../components/atoms/a-helpButton";
  // const fb = require('../services/firebaseConfig.js');

  export default {
    components: {
      OSkillLevel__panel,
      AHelpButton

    },
    filters: {},
    data() {
      return {
        selected: [],
        searchTerm: '',
        showOnlyUserSkills: false
      };
    },
    computed: {
      ...mapState([
        'userProfile',
        'currentUser',
        'skillGroups',
        'skills',
        'skillLevels',
        'skillGroupSkills',
        'roles'
      ]),
      searchResults: function () {
        let newSkillGroupSkills = {};


        if (this.searchTerm.length > 0) {

          for (let group in this.skillGroupSkills) {
            newSkillGroupSkills[group] = {
              'skills': new Set
            };

            this.skillGroupSkills[group].skills.forEach(point => {

              if (point.name.toLowerCase().includes(this.searchTerm.toLowerCase())) {

                newSkillGroupSkills[group].skills.add(point);
              }
            });
          }



        } else {
          for (let group in this.skillGroupSkills) {
            newSkillGroupSkills[group] = {
              'skills': new Set
            };

            this.skillGroupSkills[group].skills.forEach(point => {

                newSkillGroupSkills[group].skills.add(point);

            });
          }
        }

        if (this.showOnlyUserSkills === true){
          for (let group in newSkillGroupSkills) {
            this.skillGroupSkills[group].skills.forEach(point => {

              let userSkill = this.userProfile.userSkills.find(sk => sk.skillTypeId === point.id);
              if (!userSkill) {
                newSkillGroupSkills[group].skills.delete(point);
              }

            });
          }

        }



        return newSkillGroupSkills;


        return this.skillGroupSkills;
      }
    },
    created: function () {
      this.$emit('setLoadingState', true);
    },
    mounted: function () {
      this.$emit('setLoadingState', false);
      this.$emit('setNavPanelState', false);
    },
    methods: {
      setGridLayout: function (index) {
        this.$emit('setGridLayout', index);
      },
      setHelpPanelContent(e) {
        this.$emit('setHelpPanelContent', e);
      }
    }
  };
</script>


<style scoped lang="scss">
  @import "@/styles/main.scss";


  .o-profile {
    &__filterForm {
      margin: space(4) 0;
    }
    @each $key, $color in $colorVisualization {
      &__groupCard:nth-child(#{$key}n) {
        background-color: $color;
      }
    }

    &__groupCard {
      padding: space(5) 0;
    }

    &__groupCardHeader {
      margin: space(4) 0;
    }

    &__skillList {
      list-style: none;
      padding: 0;
    }

    &__skillListItem {
      border-bottom: 0.0625rem solid $white;
      margin-bottom: space(2);
      padding: 0 0 0 space(4);


    }

    &__skillListItemHeader {

      margin: space(3) 0;
    }

    &__skillListButton {
      margin-top: space(1);
    }
  }

  @media (max-width: 576px) {
    .o-profile {

      &__skillListItem {
        margin-bottom: space(4);
        padding: 0;


      }

      &__skillListItemMeta {
        display: block;
        width: 100%;
      }


    }
  }
</style>
