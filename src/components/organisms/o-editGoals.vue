<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h1>Set Goals</h1>

          <p>
            <input
              id="o-editGroups__toggleUserCurrentGoals"
              v-model="toggleShowOnlyUserGoals"
              type="checkbox"
            >
            <label for="o-editGroups__toggleUserCurrentGoals">Show only current goals</label>
          </p>
        </div>
        <ul
          id=""
          class="o-editGroups__cardContainer col-12"
        >
          <li v-for="(group, group_key) in skillGroups">
            <h2>{{ group.name }}</h2>

            <div class="container">
              <div class="row">
                <template
                  v-for="skill in group.skills"
                >
                  <div
                    v-if="toggleShowOnlyUserGoals === false || (toggleShowOnlyUserGoals === true && getCurrentGoalLevel(skill.s_id) !== '—')"
                    class=" col-6 col-md-4 mb-4 "
                  >
                    <div
                      class="o-editGroups__skillCard p-4 "
                      :class="{'-isRequired': skill.required}"
                    >
                      <p>
                        {{ skill.name }}
                        <br>
                        Current Level &amp; Goal: {{ getCurrentSkillLevel(skill.s_id) }} /
                        {{ getCurrentGoalLevel(skill.s_id) }}
                      </p>

                      <div class="d-flex">
                        <button
                          v-for="level in skillLevels"
                          v-bind:class="{'-targetLevel': currentGoalLevels[skill.s_id][level.level], '-active': currentSkillLevel[skill.s_id][level.level]}"
                          class="flex-grow-1"
                          @click="setSkill(level, group_key, skill)"
                        >
                          {{ level.level }}
                        </button>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  const fb = require('../../services/firebaseConfig.js');

  export default {
    name: "o-editGoals",
    components: {},
    filters: {},
    data() {
      return {
        selected: [],
        toggleShowOnlyUserGoals: false
      };
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
      currentGoalLevels: function () {
        let currentGoalLevels = {};

        for (let s_id in this.skills) {

          currentGoalLevels[s_id] = {};

          for (let level in this.skillLevels) {
            let level_number = this.skillLevels[level]['level'];

            currentGoalLevels[s_id][level_number] = false;
          }

          if (this.userProfile['skills'][s_id]) {
            if (this.userProfile['skills'][s_id]['level_goal']) {
              let level_goal = this.userProfile['skills'][s_id]['level_goal']['level'];

              currentGoalLevels[s_id][level_goal] = true;
            }
          }
        }

        console.log(currentGoalLevels);

        return currentGoalLevels;
      },
      currentSkillLevel: function () {
        let currentGoalLevels = {};

        for (let s_id in this.skills) {

          currentGoalLevels[s_id] = {};

          for (let level in this.skillLevels) {
            let level_number = this.skillLevels[level]['level'];

            currentGoalLevels[s_id][level_number] = false;
          }

          if (this.userProfile['skills'][s_id]) {
            let level_goal = this.userProfile['skills'][s_id]['level'];

            currentGoalLevels[s_id][level_goal] = true;

          } else {
            currentGoalLevels[s_id][0] = true;
          }
        }

        console.log(currentGoalLevels);

        return currentGoalLevels;
      }
    },
    created: function () {
      this.$emit('setLoadingState', true);
    },
    mounted: function () {
      this.$emit('setLoadingState', false);
    },
    methods: {
      setSkill(level, group_key, skill) {
        let currentUserProfile = this.userProfile;


        if (!currentUserProfile['skills'][skill.s_id]) {
          currentUserProfile['skills'][skill.s_id] = {
            group_name: this.skillGroups[group_key]['name'],
            level: 0,
            level_name: this.skillLevels[0]['name'],
            s_id: skill.s_id,
            skill_name: skill.name,
            sl_id: this.skillLevels[0]['sl_id']
          };
        }

        currentUserProfile['skills'][skill.s_id]['level_goal'] = level;

        console.log(currentUserProfile['skills'][skill.s_id]);

        fb.usersCollection.doc(this.currentUser.uid).update({
          skills: currentUserProfile['skills']
        }).then(ref => {

        }).catch(err => {
          console.log(err);
        });

      },
      getCurrentSkillLevel(s_id) {
        if (this.userProfile.skills[s_id]) {
          return this.userProfile.skills[s_id]['level'];
        }
        return 0;
      },
      getCurrentGoalLevel(s_id) {
        if (this.userProfile.skills[s_id]) {
          if (this.userProfile.skills[s_id]['level_goal']) {
            return this.userProfile.skills[s_id]['level_goal']['level'];
          }
        }
        return '—';
      }
    }
  };
</script>


<style scoped lang="scss">
  @import "@/styles/main.scss";

  h1 {
    margin-bottom: space(4);
  }

  button {
    @include deepShadow(8, colorViz(7), 30%);
    border: 0;
    border-radius: 0;
    cursor: pointer;
    flex-grow: 1;
    font-weight: bold;
    padding: space(1) space(2);
    position: relative;

    @for $i from 0 through 6 {
      &:nth-child(#{$i}) {
        z-index: #{$i};
      }
    }


    &.-targetLevel {
      @include deepShadow(8, colorViz(4), 10%);
      border-radius: 0;
    }

    &.-active {
      @include deepShadow(8, colorViz(5), 15%);
      border-radius: 0;
      transition: box-shadow 100ms;


      &:active {
        @include buttonshadowActive(colorViz(3), 15%);
      }

    }

    &.-current {

    }

    &:active {
      @include buttonshadowActive($light, 15%);
    }

    &:hover {
      @include deepShadow(8, $primary, 15%);
      border-radius: 0;
    }


    &:first-child {
      border-radius: $border-radius 0 0 $border-radius;

      &:hover {
        border-radius: $border-radius 0 0 $border-radius;
      }
    }

    &:last-child {
      border-radius: 0 $border-radius $border-radius 0;

      &:hover {
        border-radius: 0 $border-radius $border-radius 0;
      }
    }
  }

  .o-editGroups {
    &__cardContainer {
      list-style: none;
      overflow: auto;


      @each $key, $color in $colorVisualization {
        li:nth-child(#{$key}n) {
          @include deepShadow(16, $color, 20%);
          margin-bottom: space(4);
          padding: space(4);
        }


      }
    }

    &__skillCard {
      @include deepShadow(6, colorViz(7), 30%);


      &.-isRequired {

        @include deepShadow(6, $primary, 30%);

        p {
          font-weight: bold;
        }
      }

      p {
        min-height: 6rem;
      }
    }
  }


</style>
