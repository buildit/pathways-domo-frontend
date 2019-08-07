<template>
  <div class="d-flex justify-content-between m-0 p-0">
    <button v-for="(thisLevel) in skillLevels" :style="'z-index:'+thisLevel.level"
            v-bind:class="{'-active': isActive[thisLevel.level],'-targetLevel': targetLevel[thisLevel.level]}"
            @click.stop="setSkill(thisLevel)">
      {{ thisLevel.level }}
    </button>
  </div>
</template>
<script>
  import { mapState } from 'vuex';
  import Api from '../../services/apiConfig';

  export default {
    name: "o-skillLevel__panel",
    props: {
      group: Object,
      group_key: Number,
      skill: Object,
      skill_key: Number
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
        'roles',
        'userRoles'
      ]),
      targetLevel: function () {
        let newTargetStates = [];

        for (let i = 0; i < this.skillLevels.length; i++) {
          newTargetStates[i] = false;
        } // set up the array for each button state

        /*if (this.userRoles.find(ur => ur.[this.group_key]) {
            const thisCurrentLevel = parseInt(this.userRoles[this.group_key]['level']);

            if (thisCurrentLevel < this.roles.length - 1) {
                const nextLevel = thisCurrentLevel + 1;
                const nextRoleID = this.roles[nextLevel]['r_id'];

                const requiredNextLevel = this.skillGroups[this.group_key]['roles'][nextRoleID]['skills'][this.skill_key]['level'];

                if (this.userProfile.userSkills[this.skill_key]) {
                    if (this.userProfile.userSkills[this.skill_key].level < requiredNextLevel) {
                        newTargetStates[requiredNextLevel] = true;
                    } // if higher than ignore since it's not relevant for promotion
                } else {
                    newTargetStates[requiredNextLevel] = true;
                } // if user has existing level at this skill
            }    // check if user isn't already mastered
        } // if role levels is set up

        if (this.userProfile.userSkills[this.skill_key]) {
            if (this.userProfile.userSkills[this.skill_key]['level_goal']) {
                let level_goal = this.userProfile.userSkills[this.skill_key]['level_goal']['level'];

                for (let i = 0; i < this.skillLevels.length; i++) {
                    newTargetStates[i] = false;
                } // set up the array for each button state

                newTargetStates[level_goal] = true;
            }

        } // user goal override
*/
        return newTargetStates;
      },
      isActive: function () {
        let newActiveStates = [];

        for (let i = 0; i < this.skillLevels.length; i++) {
          newActiveStates[i] = false;
        }

        let userSkill = this.userProfile.userSkills.find(sk => sk.skillTypeId === this.skill_key);
        if (userSkill) {
          newActiveStates[this.skillLevels.find(sl => sl.id === userSkill.skillLevelId).level] = true;
        } else {
          newActiveStates[0] = true;
        }

        return newActiveStates;
      }
    },

    created: function () {

    },
    methods: {
      setSkill(targetLevel) {
        let targetSkill = {};
        let api = new Api();
        let userSkill = {
          skillTypeId: this.skill_key,
          skillLevelId: targetLevel.id
        };
        api.initialize().then(a => a.UserSkill().setUserSkill(userSkill));
        console.log(targetLevel);
        console.log(this.skill_key);
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
              background-color: rgba($white, 50%);
              border: 0;
              border-radius: 0;
              cursor: pointer;
              flex-grow: 1;
              max-height: space(6);
              padding: space(1) space(3);

              @for $i from 0 through 5 {
                  &:nth-child(#{$i}) {
                      z-index: #{$i};
                  }
              }


              &.-active {
                  background-color: rgba($white, 75%);
                  font-weight: bold;
                  transition: box-shadow 100ms;


              }


              &:hover {
                  background-color: colorViz(7);

              }


          }
      }
  }
</style>
