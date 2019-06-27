<template>
  <div class="OHelpPanel__container">
    <span v-html="computedObject"></span>
  </div>
</template>

<script>
  import { mapState } from 'vuex';


  export default {

    name: "OHelpPanel__content",
    components: {},
    filters: {},
    props: ['helpPanel_object'],
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
        'roleLevelRules'
      ]),
      computedObject: function () {
        let temp = '';
        if (this.helpPanel_object.type === 'skill') {
          temp = this.constructSkillObject();
        } else if (this.helpPanel_object.type === 'group') {
          temp = this.constructGroupObject();
        }

        return temp;
      }
    },
    created: function () {

    },
    methods: {
      setHelpPanelState(state) {
        this.$emit('setHelpPanelState', state);
      },
      constructSkillObject: function () {
        let skillEntry = this.skills.find(item => item.id === this.helpPanel_object.id);

        console.log(skillEntry);

        let string = '<h1>' + skillEntry.name + "</h1>";

        if (skillEntry.description.length > 0) {
          string += '<p>' + skillEntry.description + '</p>';
        }
        
        let skillLevels = this.roleLevelRules.filter(item => item.skillTypeId === this.helpPanel_object.id);
        skillLevels = skillLevels.sort((a, b) => a.roleLevel.level - b.roleLevel.level);

        string += '<h2>Required Levels For Each Role</h2>';

        string += '<ul>';
        for (let item of skillLevels) {
          string += '<li>' + item.roleLevel.name + ': ' + item.skillLevel.name + ' (' + item.skillLevel.level + ")</li>";
        }
        string += '</ul>';
        return string;
      },
      constructGroupObject: function () {
        let string = this.skillGroups[this.helpPanel_object.id].name + "\n\n";


        let orderedRoles = this.roles.sort((a, b) => a.level - b.level);


        let filteredObject = this.roleLevelRules.filter(item => item.roleTypeId === this.helpPanel_object.id && item.roleLevelId === orderedRoles[0].id);
        filteredObject = filteredObject.sort(function (a, b) {
          var nameA = a.skillType.name.toUpperCase(); // ignore upper and lowercase
          var nameB = b.skillType.name.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        });


        string += '<table>';
        string += '<tr><td>Skill Name</td>';
        for (let roleItem in orderedRoles) {
          string += '<td>' + orderedRoles[roleItem].name + "</td>";
        }
        string += '</tr>';
        for (let skillItem of filteredObject) {
          string += '<tr>';
          string += '<td>' + skillItem.skillType.name + "</td>";

          for (let roleItem in orderedRoles){

            let skillLevelsObject = this.roleLevelRules.filter(
              item => item.roleTypeId === this.helpPanel_object.id &&
                item.roleLevelId === orderedRoles[roleItem].id &&
            item.skillTypeId === skillItem.skillTypeId);

            for (let skillLevelItem of skillLevelsObject){

              string +=   '<td>' + skillLevelItem.skillLevel.level + "</td>";
            }
          }

          string += '</tr>';
          string +=  "\n";
        }
        string += '</table>';




        return string;
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "@/styles/main.scss";

  .OHelpPanel {
    &__container {
      color: $white;
    }
  }

</style>
