<template>
  <div>
    <h1>Edit Groups</h1>


    <div class="row">

      <div class="col-12">


        <pre>{{skillsByRoleAndGroup[0]}}</pre>

        <div v-for="group in skillsByRoleAndGroup">
          <h1>
            {{group.roleTypeName}}
          </h1>

          <table>
            <tr>
              <td></td>
              <td v-for="role in roles">
                {{role.name}}
              </td>
            </tr>

            <tr v-for="(skill, skillName) in group.skills">
              <td>{{skillName}}



              </td>
              <!--            {{skill.roleLevelName}}-->


              <td v-for="role in roles">
                {{skill[role.id].skillLevel.level}}
              </td>


            </tr>
          </table>

        </div>


      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  // const fb = require('../services/firebaseConfig.js');

  export default {
    components: {},
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
        'roles',
        'roleLevelRules'
      ]),
      skillsByRoleAndGroup: function () {
        let temp = {};
        let roleLevelObject = {};

        for (let roleLevel of this.roles) {
          console.log(roleLevel.name);
          roleLevelObject[roleLevel.id] = {
            roleLevelId: roleLevel.id,
            roleLevelName: roleLevel.name,
            skillLevel: {}
          };
        }


        for (let group of this.skillGroups) {

          temp[group.id] = {
            roleTypeName: group.name,
            roleTypeId: group.id,
            skills: {}
          };


        }

        for (let roleRule of this.roleLevelRules) {

          if (typeof temp[roleRule.roleTypeId]['skills'][roleRule.skillType.name] === 'undefined') {
            temp[roleRule.roleTypeId]['skills'][roleRule.skillType.name] = roleLevelObject;
          }

          temp[roleRule.roleTypeId]['skills'][roleRule.skillType.name][roleRule.roleLevelId]['skillLevel'] = roleRule.skillLevel;
        }


        return temp;


      }
    },
    created: function () {
      this.$emit('setLoadingState', true);
    },
    mounted: function () {
      this.$emit('setLoadingState', false);
    },
    methods: {
      setSkill(level, group_key, skill, role) {
        let targetSkill = {};

        targetSkill[role.r_id] = {
          role_name: role.name,
          r_id: role.r_id,
          skills: {}

        };

        targetSkill[role.r_id].skills[skill.s_id] = {
          s_id: skill.s_id,
          skill_name: skill.name,
          level: level.level,
          sl_id: level.sl_id,
          level_name: level.name
        };

        // console.log(group_key)


        fb.skillGroupsCollection.doc(group_key).set({
          roles: targetSkill
        }, {
          merge: true
        }).then(ref => {

        }).catch(err => {
          console.log(err);
        });
      },
      filterBySkillGroup: function (sgId) {
        return this.roleLevelRules.filter(function (item) {
          if (item.roleTypeId === sgId) {
            return true;
          }

          return false;

        });
      },
      filteredSkillGroupRoles: function (sgId, roleId) {
        let newArray = [];

        for (let item of this.roleLevelRules) {
          if (item.roleTypeId === sgId && item.roleLevelId === roleId) {
            newArray.push(item);
          }
        }
        return newArray;
      },
      findUserSkillLevel: function (targetSkillId) {
        //skill.skillType.id

        let userSkill = this.userProfile.userSkills.find(sk => sk.skillTypeId === targetSkillId);
        if (userSkill) {
          const level = this.skillLevels.find(sl => sl.id === userSkill.skillLevelId);
          return level.level;
        } else {
          return 0;
        }

      }
    }
  };
</script>


<style scoped lang="scss">
  @import "@/styles/main.scss";


</style>
