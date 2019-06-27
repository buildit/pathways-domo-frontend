<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>Profile</h1>


        <div v-for="group in skillGroups">
          <h2>
            {{group}}
            {{group.name}}
            <a-help-button v-bind:id="group.id" v-bind:type="'group'"
                           @setHelpPanelContent="setHelpPanelContent"></a-help-button>
          </h2>

          <ul class="o-profile__skillList">

            <template v-for="skill in skillGroupSkills[group.id].skills">
              <li class="d-flex justify-content-between">
                <p class="">{{ skill.name }} </p>
                <div class="d-flex ">

                  <o-skill-level__panel v-bind:group="group" v-bind:group_key="group.id" v-bind:skill="skill"
                                        v-bind:skill_key="skill.id"></o-skill-level__panel>
                  <a-help-button v-bind:id="skill.id" v-bind:type="'skill'"
                                 @setHelpPanelContent="setHelpPanelContent"></a-help-button>

                </div>

              </li>
            </template>
          </ul>
        </div>
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
        selected: []
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
      ])
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
    &__skillList {
      background-color: colorViz(2);
      padding: space(4);
    }
  }
</style>
