<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <pre>{{roleLevelRules[0]}}</pre>
        <pre>{{skills[0]}}</pre>
        <p>{{skillGroups}}</p>

        <template v-for="group in skillGroups">
          <h1>{{group.name}}</h1>
          <h2>{{group.title}}</h2>

          <template v-for="role in roles">

            {{role.name}}
            <ul >
              <li v-for="skill in filteredSkillGroupRoles(group.id, role.id)">
                {{skill.skillType.name}} {{skill.roleLevel.name}} {{skill.roleLevel.level}} {{skill.skillLevel.level}}
              </li>
            </ul>
          </template>


        </template>


        <p>{{roleLevelRules.length}}</p>
        <pre>{{filteredSkillGroupRoles(4)}}</pre>

        <h3>roles qq</h3>
        <pre>{{roles}}</pre>

        <h3>skillLevels</h3>
        <pre>{{skillLevels}}</pre>

        <h3>skillGroups</h3>
        <p>{{skillGroups}}</p>
        <p>{{skills}}</p>


        <p>{{ users}}</p>
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
          if (item.roleTypeId === sgId && item.roleLevelId === roleId){
            newArray.push(item);
          }
        }
        return newArray;
      }
    }
  };
</script>
<style scoped lang="scss">
  @import "@/styles/main.scss";


</style>
