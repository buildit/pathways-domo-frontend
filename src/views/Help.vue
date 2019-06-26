<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <pre>
           {{roleLevelRules}}
        </pre>


        <template v-for="group in skillGroups">
          <h1>{{group.name}}</h1>
          <h2>{{group.title}}</h2>

          <template v-for="role in roles">

            {{role.name}}
            <ul>
              <template v-for="skill in filteredSkillGroupRoles(group.id, role.id)">
                <li v-if="skill.skillLevel.level > 0">{{skill.skillType.name}} {{skill.skillLevel.level}} vs {{findUserSkillLevel(skill.skillType.id)}}
                </li>

              </template>
            </ul>
          </template>

        </template>



        <h3>roles qq</h3>
        <pre>{{roles}}</pre>

        <h3>skillLevels</h3>
        <pre>{{skillLevels}}</pre>

        <h3>skillGroups</h3>
        <pre>{{skillGroups}}</pre>


        <h3>users</h3>
        <pre>{{ users[0]}}</pre>

      </div>
    </div>
  </div>
</template>
<script>

  import { mapState } from "vuex";
  import store from '../store';

  const currentUser = function () {
    return store.state.currentUser;
  };
  export default {
    components: {},
    data() {
      return {};
    },
    computed: {
      ...mapState([
        'currentUser',
        'skillGroupSkills',
        'roleLevelRules',
        'users',
        'roles',
        "skillLevels",
        "skillGroups",
        "skills",
        'userProfile',
        'userRoles'
      ]),
    },
    created: function () {
      this.$emit('setLoadingState', true);
    },
    mounted: function () {
      this.$emit('setLoadingState', false);
    },
    methods: {
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
          const level = this.skillLevels.find(sl => sl.id === userSkill.skillLevelId)
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
