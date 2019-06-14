<template>
  <div class="container">
    <div v-for="row in sortedList">
      user_first_name user_last_name
      <h1>{{ row.user_first_name }} {{ row.user_last_name }}</h1>
      <span>forecast_user_id {{ row.user_id }}</span>
      <p>{{ row.user_email }}</p>

      <p>{{ matchToLevel(row.roles.band) }}</p>
      <p>{{ matchToGroup(row.roles.role) }}</p>

      <div v-for="item in matchToGroup(row.roles.role).sg">
        <p v-for="skill in skillGroups[item.sg_id]['skills']">
          {{ skill.name }}, {{ skill.s_id }}, {{ skill.required }}, {{ item.sg_id }}, {{ item.sg_name }},
          {{ matchToLevel(row.roles.band).level }}, {{ matchToLevel(row.roles.band).sl_id }},
          {{ matchToLevel(row.roles.band).sl_name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";

  // const fb = require('../../services/firebaseConfig.js');

  export default {
    name: "AddUsersFromDOMO",
    computed: {
      ...mapState([
        'accessToken',
        'accessTokenStatus',
        'apiCallStatus',
        'apiData',
        'datasetList',
        'skillGroups',
        'skillLevels',
        'roles'
      ]),
      columns: function () {
        return this.apiData.columns;
      },
      rows: function () {
        return this.apiData.rows;
      },
      sortedList: function () {
        const user_is_activeIndex = this.getIndexOfColumn('user_is_active');
        let benchPeople = {};

        if (typeof this.rows === "object") {
          for (let i = 0; i < this.rows.length; i++) {
            if (this.rows[i][user_is_activeIndex] === 'true') {
              const roles = this.splitRoles(this.rows[i][this.getIndexOfColumn('user_roles')]);
              const user_id = this.rows[i][this.getIndexOfColumn('user_id')];

              benchPeople[user_id] = {
                'roles': roles
              };

              for (let j = 0; j < this.columns.length; j++) {
                benchPeople[user_id][this.columns[j]] = this.rows[i][j];
              }
            }
          }
        }

        return benchPeople;
      },
      rolesInDomo: function () {
        let roles = {};
        for (let i in this.sortedList) {
          const thisRole = this.sortedList[i].roles.role;

          if (typeof roles[thisRole] === "undefined") {
            roles[thisRole] = 1;
          } else {
            roles[thisRole] += 1;
          }
        }
        return roles;
      },
      bandsInDomo: function () {
        let roles = {};
        for (let i in this.sortedList) {
          const thisRole = this.sortedList[i].roles.band;

          if (typeof roles[thisRole] === "undefined") {
            roles[thisRole] = 1;
          } else {
            roles[thisRole] += 1;
          }
        }
        return roles;
      }
    },
    mounted: function () {

      if (this.accessTokenStatus !== 200) {
        this.$store.dispatch('requestAccessToken').then(() => {
          this.$store.dispatch('makeDOMOCall', {
            method: 'post',
            call: 'datasets/query/execute',
            id: '8b209fa4-bb92-4b39-8e73-3f4183542129',
            data: {"sql": "SELECT * FROM table"}
          }).then(() => {


          }).catch(e => {

          });


        }).catch(e => {

        });
      }


    },
    methods: {

      getIndexOfColumn: function (target) {
        if (typeof this.columns === "undefined") {
          return false;
        }
        for (let i = 0; i < this.columns.length; i++) {
          if (this.columns[i] === target) {
            return i;
          }
        }

        return false;
      },
      generateRandomPwd: function () {
        let string = '';
        for (let i = 0; i < 32; i++) {
          const caseSwitch = Math.floor(Math.random() * 3);

          let dec = Math.ceil(Math.random() * 9 + 48);
          switch (caseSwitch) {
            case 0:
              dec = Math.ceil(Math.random() * 25 + 65);
              break;
            case 1:
              dec = Math.ceil(Math.random() * 25 + 97);
              break;
          }

          string += String.fromCharCode(dec);
        }

        return string;
      },
      splitRoles: function (val) {
        if (typeof val === "undefined") {
          return false;
        }
        const asArray = val.split(',');
        let asObject = {};

        for (let i = 0; i < asArray.length; i++) {
          const keypair = asArray[i].split('=');

          asObject[keypair[0]] = keypair[1];
        }

        return asObject;
      },
      matchToLevel: function (val) {
        //{   "B3": 52,  "B2": 9, "undefined": 3, "NA": 16, "B1": 4 }

        let level = 1;
        switch (val) {
          case 'D1':
          case 'D1':
          case 'C2':
            level = 4;
            break;
          case 'C1':
            level = 3;
            break;

          case 'B3':
            level = 2;
            break;


          default:
            level = 1;
            break;
        }

        let sl_id, sl_name;

        for (let i in this.skillLevels) {
          if (this.skillLevels[i]['level'] === level) {


            sl_id = this.skillLevels[i]['sl_id'];
            sl_name = this.skillLevels[i]['name'];
            break;
          }
        }
        return {
          sl_id: sl_id,
          sl_name: sl_name,
          level: level,
          band: val
        };
      },
      matchToGroup: function (val) {

        let sg = [];
        switch (val) {
          case 'Creative Technologist':

            sg = [
              {
                sg_id: 'WeMMa29QFFX0CawNvGul',
                sg_name: this.skillGroups['WeMMa29QFFX0CawNvGul']['name']
              }
            ];

            break;

          case 'Platform Engineer':
          case 'Front End Engineer':
          case 'Mobile Engineer':
          case 'Quality Engineer':
          case 'Java Developer':
            sg = [
              {
                sg_id: 'CXbrcD3wa171tjcXGErx',
                sg_name: this.skillGroups['CXbrcD3wa171tjcXGErx']['name']
              }
            ];

            break;
          case 'Delivery Lead':
            sg = [
              {
                sg_id: 'KviI8OyqLzMKrQQgrhky',
                sg_name: this.skillGroups['KviI8OyqLzMKrQQgrhky']['name']
              }
            ];

            break;

          case 'Architect':
            sg = [
              {
                sg_id: 'MOfywbPc2WHiVjkwTSZt',
                sg_name: this.skillGroups['MOfywbPc2WHiVjkwTSZt']['name']
              }
            ];

            break;


          default:
            sg = [
              {
                sg_id: 'JcQVhJ0rI64qBhvnqt0d',
                sg_name: this.skillGroups['JcQVhJ0rI64qBhvnqt0d']['name']
              },
              {
                sg_id: 'unJptogvHgGpA1fP9dAw',
                sg_name: this.skillGroups['unJptogvHgGpA1fP9dAw']['name']
              },
              {
                sg_id: 'YXbSkAtSbx6o1EhuAMnU',
                sg_name: this.skillGroups['YXbSkAtSbx6o1EhuAMnU']['name']
              }
            ];

            break;
        }
        return {
          sg: sg,
          role: val
        };
      },
      dangerousAddWithoutLogin: function () {


        for (let i in this.sortedList) {
          const thisUser = this.sortedList[i];

          const bandLevel = this.matchToLevel(thisUser.roles.band);
          const roleGroup = this.matchToGroup(thisUser.roles.role);

          const userPackage = {
            user_first_name: thisUser.user_first_name,
            user_last_name: thisUser.user_last_name,
            forecast_user_id: thisUser.user_id,
            user_email: thisUser.user_email,
            skills: {}
          };


          for (let i = 0; i < roleGroup.sg.length; i++) {
            const thisSG = roleGroup.sg[i];


            for (let skill in this.skillGroups[thisSG.sg_id]['skills']) {
              const thisSkill = this.skillGroups[thisSG.sg_id]['skills'][skill];

              userPackage['skills'][thisSkill.s_id] = {
                sg_id: thisSG.sg_id,
                group_name: thisSG.sg_name,
                s_id: thisSkill.s_id,
                skill_name: thisSkill.name,
                level: bandLevel.level,
                sl_id: bandLevel.sl_id,
                level_name: bandLevel.sl_name,
              };
            }
          }

          userPackage['roles'] = this.calculateRoles(userPackage.skills);



          console.log(userPackage);
          fb.usersCollection.add(userPackage).then(() => {

          }).catch(err => {
            console.log(err);
            this.performingRequest = false;
            this.errorMsg = err.message;
          });




        }

        return false;

      },
      calculateRoles: function (skillsPackage) {
        let newRoleLevels = {};


        for (let sg_id in this.skillGroups) {
          const currentGroup = this.skillGroups[sg_id];

          newRoleLevels[sg_id] = {
            title: currentGroup['title'],
            level: 0,
            level_name: this.roles[0]['name'],
            targetTracking: {},
            group_name: currentGroup['name']
          };

          for (let i = 0; i < this.roles.length; i++) {
            const currentRole = this.roles[i];
            const r_id = currentRole['r_id'];
            const skillsInRoleCollection = currentGroup['roles'][r_id]['skills'];

            newRoleLevels[sg_id]['targetTracking'][r_id] = {
              total: 0,
              userPoints: 0,
              role_name: currentRole['name'],
            };

            let numberOfSkillsNeeded = 0;
            let skillsMet = 0;

            for (let s_id in skillsInRoleCollection) {
              let currentUserSkillLevel = 0;
              let requiredSkillLevel = currentGroup['roles'][r_id]['skills'][s_id]['level'];

              if (currentGroup['skills'][s_id]['required'] === true) {
                if (skillsPackage[s_id]) {
                  currentUserSkillLevel = skillsPackage[s_id]['level'];


                  if (currentUserSkillLevel >= requiredSkillLevel) {
                    skillsMet++;
                    newRoleLevels[sg_id]['targetTracking'][r_id]['userPoints'] += Math.min(currentUserSkillLevel, requiredSkillLevel);

                  } // if the user meets set level

                } else {
                  if (requiredSkillLevel === 0) {
                    skillsMet++;
                  }
                }  // if user has skill or not


                numberOfSkillsNeeded++;
                newRoleLevels[sg_id]['targetTracking'][r_id]['total'] += requiredSkillLevel;
              } // if required as a skill
            } // for loop skills

            if (skillsMet === numberOfSkillsNeeded) {
              newRoleLevels[sg_id]['level'] = currentRole['level'];
              newRoleLevels[sg_id]['level_name'] = currentRole['name'];
            } // if hit the criteria
          } // for roles
        }

        return newRoleLevels;
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "@/styles/main.scss";

</style>
