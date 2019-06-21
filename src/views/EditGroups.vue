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

          <div v-for="(skill, skillName) in group.skills">
            <h2>{{skillName}}</h2>
            {{skill.roleLevelName}}


            <div v-for="level in skill">
              <h3>{{level.roleLevelName}}</h3>
              {{level.skillLevel.level}}
            </div>
          </div>

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
        // return temp;

        /*
        {
  "roleTypeId": 1,
  "roleType": {
    "title": "Engineer",
    "name": "Software Engineering",
    "id": 1
  },
  "roleLevelId": 1,
  "roleLevel": {
    "level": 2,
    "description": "e.g. Individuals with some level of experience in their Skill Group, who are able to work independently without supervision.",
    "name": "Professional",
    "id": 1
  },
  "skillTypeId": 1,
  "skillType": {
    "description": "",
    "name": "Information security",
    "id": 1
  },
  "skillLevelId": 4,
  "skillLevel": {
    "level": 4,
    "description": "As above, but with demonstrated ability to lead others on the project engagement / activity their team is involved in",
    "name": "Lead",
    "id": 4
  },
  "essentialSkill": null
}
*/

        let roleLevelObject = {};

        for (let roleLevel of this.roles){

          roleLevelObject[roleLevel.id] = {
            roleLevelId: roleLevel.id,
            roleLevelName: roleLevel.name,
            skillLevel: {}
          };
        }

        console.log(roleLevelObject);
        for (let group of this.skillGroups){

          temp[group.id] = {
            roleTypeName: group.name,
            roleTypeId: group.id,
            skills: {}
          };


        }

        for (let roleRule of this.roleLevelRules){
          console.log(roleRule.roleTypeId, roleRule.roleLevelId, roleRule.skillType.name, roleRule.skillType.id);
          if ( typeof  temp[roleRule.roleTypeId]['skills'][roleRule.skillType.name] === 'undefined'){
            temp[roleRule.roleTypeId]['skills'][roleRule.skillType.name] = roleLevelObject;
          }

          temp[roleRule.roleTypeId]['skills'][roleRule.skillType.name][roleRule.roleLevelId]['skillLevel'] = roleRule.skillLevel
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
