<template>
  <div class="d-flex justify-content-between m-0 p-0">
    <button v-for="(thisLevel, index) in skillLevels" :style="'z-index:'+thisLevel[thisLevel.level]"
            v-bind:class="{'-active': isActive[thisLevel.level],'-targetLevel': targetLevel[thisLevel.level]}"
            @click.stop="setSkill(thisLevel)"
    >
      {{ thisLevel.level }}
    </button>
  </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: "o-skillLevel__panel",
        props: {
            group: Object,
            group_key: String,
            skill: Object,
            skill_key: String
        },
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
            targetLevel: function () {
                let newTargetStates = [];

                for (let i = 0; i < this.roles.length; i++) {
                    newTargetStates[i] = false;
                }

                // determine user role level;
                if (this.userProfile.roles == null) {

                }


                if (this.userProfile.roles[this.group_key]) {
                }

                const thisCurrentLevel = parseInt(this.userProfile.roles[this.group_key]['level']);

                if (thisCurrentLevel < this.roles.length - 1) {
                    const nextLevel = thisCurrentLevel + 1;
                    const nextRoleID = this.roles[nextLevel]['r_id'];

                    const requiredNextLevel = this.skillGroups[this.group_key]['roles'][nextRoleID]['skills'][this.skill_key]['level'];

                    if (this.userProfile.skills[this.skill_key]) {
                        if (this.userProfile.skills[this.skill_key].level < requiredNextLevel) {
                            newTargetStates[requiredNextLevel] = true;
                        } // if higher than ignore since it's not relevant for promotion
                    } else {
                        newTargetStates[requiredNextLevel] = true;
                    } // if user has existing level at this skill
                }    // check if user isn't already mastered

                if (this.userProfile['skills'][this.skill_key]
                ) {
                    if (this.userProfile['skills'][this.skill_key]['level_goal']) {
                        let level_goal = this.userProfile['skills'][this.skill_key]['level_goal']['level'];

                        for (let i = 0; i < this.skillLevels.length; i++) {
                            newTargetStates[i] = false;
                        } // set up the array for each button state

                        newTargetStates[level_goal] = true;
                    }

                } // user goal override
                return newTargetStates;
            },
            isActive: function () {
                let newActiveStates = [];

                newActiveStates[0] = true;

                for (let i = 1; i < this.skillLevels.length; i++) {
                    newActiveStates[i] = false;
                }

                if (this.userProfile.userSkills[this.skill_key]) {
                    for (let i = 0; i < this.skillLevels.length; i++) {
                        newActiveStates[i] = false;
                    }

                    newActiveStates[this.userProfile.skills[this.skill_key].level] = true;
                } else {

                }

                return newActiveStates;
            }
        },

        created: function () {

        },
        methods: {
            setSkill(targetLevel) {
                let targetSkill = {};

                targetSkill[this.skill_key] = {
                    sg_id: this.group_key,
                    group_name: this.group.name,
                    s_id: this.skill_key,
                    skill_name: this.skill.name,
                    level: targetLevel.level,
                    sl_id: targetLevel.sl_id,
                    level_name: targetLevel.name,
                };
            }
        }
    };


</script>

<style scoped lang="scss">
  @import "@/styles/main.scss";


  ul {
    list-style: none;
    margin-left: -0.5rem;

    li {
      display: inline-block;
      flex-grow: 1;

      button {
        @include deepShadow(8, colorViz(7), 30%);
        border: 0;
        border-radius: 0;
        cursor: pointer;
        flex-grow: 1;
        font-weight: bold;
        padding: space(1) space(2);

        @for $i from 0 through 5 {
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
    }
  }


</style>
